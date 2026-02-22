#!/usr/bin/env node

// Тест полного цикла получения данных из S3
require('dotenv').config({ path: '.env.local' });

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

async function testDataFlow() {
  console.log('=== Тест получения данных из S3 ===');
  console.log(`Base URL: ${BASE_URL}\n`);

  try {
    // 1. Проверяем S3 API напрямую
    console.log('🔍 1. Тест S3 API...');
    const s3Response = await fetch(`${BASE_URL}/api/s3-upload`);
    const s3Data = await s3Response.json();
    
    console.log(`   Status: ${s3Response.status}`);
    if (s3Data.success) {
      console.log(`   ✅ Найдено файлов: ${s3Data.count}`);
      s3Data.files.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file.filename}`);
        console.log(`      URL: ${file.url}`);
      });
    } else {
      console.log(`   ❌ Ошибка: ${s3Data.error}`);
    }

    // 2. Проверяем portfolio-s3 API
    console.log('\n🔍 2. Тест Portfolio S3 API...');
    const portfolioResponse = await fetch(`${BASE_URL}/api/portfolio-s3`);
    const portfolioData = await portfolioResponse.json();
    
    console.log(`   Status: ${portfolioResponse.status}`);
    console.log(`   Projects count: ${portfolioData.projects?.length || 0}`);
    
    if (portfolioData.projects && portfolioData.projects.length > 0) {
      console.log('   📄 Проекты:');
      portfolioData.projects.forEach((project, index) => {
        console.log(`   ${index + 1}. ${project.title}`);
        console.log(`      Category: ${project.category}`);
        console.log(`      URL: ${project.pdfUrl}`);
        
        // Проверяем URL на S3
        const isS3Url = project.pdfUrl.includes('selcdn.ru') || 
                       project.pdfUrl.includes(process.env.S3_BUCKET_NAME);
        console.log(`      S3 URL: ${isS3Url ? '✅' : '❌'}`);
      });
    }

    // 3. Проверяем доступность PDF файлов
    console.log('\n🔍 3. Тест доступности PDF файлов...');
    if (portfolioData.projects) {
      for (let i = 0; i < Math.min(portfolioData.projects.length, 3); i++) {
        const project = portfolioData.projects[i];
        console.log(`   Проверка: ${project.title}`);
        
        try {
          const pdfResponse = await fetch(project.pdfUrl, { method: 'HEAD' });
          console.log(`   Status: ${pdfResponse.status} ${pdfResponse.ok ? '✅' : '❌'}`);
          console.log(`   Size: ${pdfResponse.headers.get('content-length')} bytes`);
          console.log(`   Type: ${pdfResponse.headers.get('content-type')}`);
        } catch (error) {
          console.log(`   ❌ Ошибка доступа: ${error.message}`);
        }
        console.log('');
      }
    }

    // 4. Сравнение со старым API
    console.log('🔍 4. Сравнение со старым API...');
    const oldResponse = await fetch(`${BASE_URL}/api/portfolio`);
    const oldData = await oldResponse.json();
    
    console.log(`   Status: ${oldResponse.status}`);
    console.log(`   Projects count: ${oldData.projects?.length || 0}`);
    
    if (oldData.projects && portfolioData.projects) {
      const hasDifferentUrls = oldData.projects.some((oldProj, index) => {
        const newProj = portfolioData.projects[index];
        return newProj && oldProj.pdfUrl !== newProj.pdfUrl;
      });
      
      if (hasDifferentUrls) {
        console.log('   ✅ URL изменились - данные из S3');
      } else {
        console.log('   ⚠️  URL не изменились');
      }
    }

    // 5. Итоговая проверка
    console.log('\n📊 Итоговая проверка:');
    const allS3Urls = portfolioData.projects?.every(p => 
      p.pdfUrl.includes('selcdn.ru') || p.pdfUrl.includes(process.env.S3_BUCKET_NAME)
    );
    
    console.log(`   Все URL из S3: ${allS3Urls ? '✅' : '❌'}`);
    console.log(`   Файлы доступны: ${s3Data.success ? '✅' : '❌'}`);
    console.log(`   Данные загружены: ${portfolioData.projects?.length > 0 ? '✅' : '❌'}`);

    if (allS3Urls && s3Data.success && portfolioData.projects?.length > 0) {
      console.log('\n🎉 Отлично! Данные успешно берутся из S3!');
    } else {
      console.log('\n⚠️  Есть проблемы с получением данных из S3');
    }

  } catch (error) {
    console.error('❌ Ошибка тестирования:', error.message);
    console.log('\n💡 Убедитесь что:');
    console.log('   1. Dev сервер запущен (npm run dev)');
    console.log('   2. PDF файлы загружены в S3');
    console.log('   3. Edge Config обновлен с S3 URL');
  }
}

// Запуск теста
testDataFlow();
