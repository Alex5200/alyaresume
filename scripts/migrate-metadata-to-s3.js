// scripts/migrate-metadata-to-s3.js
// Миграция метаданных портфолио из data/portfolio.json в S3

const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Загрузка переменных окружения
require('dotenv').config({ path: '.env.local' });

// Проверка переменных окружения
const requiredVars = ['S3_BUCKET_NAME', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'S3_ENDPOINT'];
const missingVars = requiredVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error('❌ Отсутствуют переменные окружения:', missingVars.join(', '));
  process.exit(1);
}

// S3 Client Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ru-3',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

const BUCKET = process.env.S3_BUCKET_NAME;

async function migrateMetadataToS3() {
  console.log('=== Миграция метаданных портфолио в S3 ===\n');

  // Чтение локального JSON
  const localDataPath = path.join(__dirname, '../data/portfolio.json');
  
  if (!fs.existsSync(localDataPath)) {
    console.error('❌ Файл data/portfolio.json не найден');
    process.exit(1);
  }

  const portfolioData = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
  console.log(`📄 Загружено ${portfolioData.projects.length} проектов из portfolio.json`);
  console.log(`📝 Заголовок: ${portfolioData.heading.main}`);
  console.log(`🔗 CTA: ${portfolioData.ctaButton.text}\n`);

  // Сохранение в S3
  const key = 'portfolio/metadata.json';
  const jsonString = JSON.stringify(portfolioData, null, 2);

  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: jsonString,
      ContentType: 'application/json',
      ACL: 'public-read',
    });

    await s3Client.send(command);

    console.log('✅ Метаданные успешно сохранены в S3');
    console.log(`📍 Путь: s3://${BUCKET}/${key}`);
    console.log(`🔗 Публичный URL: ${process.env.PUBLIC_S3_ENDPOINT}/${key}`);
    console.log('\n🎉 Миграция завершена!');
    
    console.log('\n📋 Следующие шаги:');
    console.log('1. Проверьте данные через API: GET /api/portfolio-s3');
    console.log('2. Убедитесь, что сайт отображает все проекты');
    console.log('3. Можно удалить data/portfolio.json (данные теперь в S3)');

  } catch (error) {
    console.error('❌ Ошибка при сохранении в S3:', error.message);
    process.exit(1);
  }
}

migrateMetadataToS3();
