const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Загрузка переменных окружения
require('dotenv').config({ path: '.env.local' });

// S3 Configuration for Selectel
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ru-3',
  endpoint: process.env.S3_ENDPOINT, // Только из env
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: true,
});

const BUCKET = process.env.S3_BUCKET_NAME || 'alyaadmin';

// Начальные данные портфолио
const INITIAL_PORTFOLIO_DATA = {
  heading: {
    main: "Портфолио работ",
    description: "Профессиональные чертежи и дизайн-проекты с детальной проработкой"
  },
  ctaButton: {
    text: "Заказать подобный проект",
    link: "#contact"
  },
  projects: [
    {
      id: 1,
      title: "Проект квартиры на Крузенштерна",
      description: "Полный дизайн-проект трехкомнатной квартиры с детальной проработкой всех помещений",
      category: "Квартиры",
      isActive: true,
      order: 1
    },
    {
      id: 2,
      title: "Современный интерьер",
      description: "Дизайн-проект гостиной с использованием современных материалов и технологий",
      category: "Интерьеры",
      isActive: true,
      order: 2
    },
    {
      id: 3,
      title: "Ремонт двухкомнатной квартиры",
      description: "Проект реконструкции и ремонта с перепланировкой пространства",
      category: "Ремонт",
      isActive: true,
      order: 3
    }
  ]
};

// Файлы для загрузки
const PDF_FILES = [
  { filename: '1.pdf', title: 'Проект квартиры на Крузенштерна' },
  { filename: '2.pdf', title: 'Современный интерьер' },
  { filename: 'крузенштерна23.07.pdf', title: 'Ремонт двухкомнатной квартиры' }
];

async function uploadFileToS3(filePath, key, filename) {
  const fileContent = fs.readFileSync(filePath);
  
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: fileContent,
    ContentType: 'application/pdf',
    ACL: 'public-read',
    Metadata: {
      originalName: filename,
      title: filename.replace('.pdf', '').replace(/_/g, ' ')
    }
  });

  await s3Client.send(command);
  
  return `${process.env.S3_ENDPOINT}/${BUCKET}/${key}`;
}

async function seedInitialData() {
  console.log('=== Начальная загрузка PDF файлов в Selectel S3 ===');
  
  // Проверка конфигурации
  if (!BUCKET) {
    console.error('❌ S3_BUCKET_NAME не указан в .env.local');
    process.exit(1);
  }

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error('❌ AWS credentials не настроены в .env.local');
    process.exit(1);
  }

  console.log(`🪣 Бакет: ${BUCKET}`);
  console.log(`🔗 Endpoint: ${process.env.S3_ENDPOINT}`);
  console.log('');

  try {
    const uploadResults = [];
    
    // Загрузка PDF файлов
    for (let i = 0; i < PDF_FILES.length; i++) {
      const { filename, title } = PDF_FILES[i];
      const filePath = path.join(__dirname, '../public/pdf', filename);
      
      // Проверка существования файла
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Файл не найден: ${filePath}`);
        continue;
      }
      
      const timestamp = Date.now() + i;
      const key = `portfolio/${timestamp}_${filename}`;
      
      console.log(`⬆️  Загрузка: ${filename}...`);
      
      try {
        const url = await uploadFileToS3(filePath, key, filename);
        
        uploadResults.push({
          id: i + 1,
          title: title,
          description: `Профессиональный проект: ${title}`,
          pdfUrl: url,
          category: i === 0 ? "Квартиры" : i === 1 ? "Интерьеры" : "Ремонт",
          isActive: true,
          order: i + 1
        });
        
        console.log(`✅ Загружено: ${url}`);
      } catch (error) {
        console.error(`❌ Ошибка загрузки ${filename}:`, error.message);
      }
    }

    if (uploadResults.length === 0) {
      console.error('❌ Ни один файл не был загружен');
      process.exit(1);
    }

    // Обновление данных портфолио
    const portfolioData = {
      ...INITIAL_PORTFOLIO_DATA,
      projects: uploadResults
    };

    // Сохранение локальной копии
    const localDataPath = path.join(__dirname, '../data/portfolio.json');
    if (!fs.existsSync(path.join(__dirname, '../data'))) {
      fs.mkdirSync(path.join(__dirname, '../data'), { recursive: true });
    }
    fs.writeFileSync(localDataPath, JSON.stringify(portfolioData, null, 2));
    console.log(`\n💾 Локальные данные сохранены: ${localDataPath}`);

    // Вывод данных для Edge Config
    console.log('\n=== Данные для обновления Edge Config ===');
    console.log('Скопируйте этот JSON и обновите Edge Config в Vercel Dashboard:');
    console.log(JSON.stringify(portfolioData, null, 2));

    // Сохранение отчета
    const reportPath = path.join(__dirname, '../seed-report.json');
    const report = {
      timestamp: new Date().toISOString(),
      uploaded: uploadResults.length,
      total: PDF_FILES.length,
      files: uploadResults.map(r => ({
        title: r.title,
        url: r.pdfUrl,
        category: r.category
      })),
      portfolioData: portfolioData
    };
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n=== Загрузка завершена ===');
    console.log(`✅ Успешно загружено: ${uploadResults.length} из ${PDF_FILES.length} файлов`);
    console.log(`📄 Отчет сохранен: ${reportPath}`);
    console.log(`\n🌐 URL файлов:`);
    uploadResults.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file.title}: ${file.pdfUrl}`);
    });

    console.log('\n📝 Следующие шаги:');
    console.log('1. Скопируйте JSON выше и обновите Edge Config в Vercel Dashboard');
    console.log('2. Или используйте админ панель: http://localhost:3000/admin/portfolio');
    console.log('3. Перезапустите приложение для применения изменений');

  } catch (error) {
    console.error('❌ Ошибка при загрузке:', error);
    process.exit(1);
  }
}

// Запуск загрузки
seedInitialData();
