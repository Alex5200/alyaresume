#!/usr/bin/env node

// Тест кеширования и получения данных на сайте
require('dotenv').config({ path: '.env.local' });

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

async function testWebsiteCaching() {
  console.log('=== Тест кеширования и данных на сайте ===');
  console.log(`Base URL: ${BASE_URL}\n`);

  try {
    // 1. Тестируем portfolio-s3 API с кешированием
    console.log('🔍 1. Тест Portfolio S3 API (с кешированием)...');
    
    // Первый запрос
    console.log('   Первый запрос...');
    const start1 = Date.now();
    const response1 = await fetch(`${BASE_URL}/api/portfolio-s3`);
    const data1 = await response1.json();
    const time1 = Date.now() - start1;
    
    console.log(`   Status: ${response1.status}`);
    console.log(`   Cache-Control: ${response1.headers.get('cache-control')}`);
    console.log(`   Время: ${time1}ms`);
    console.log(`   Projects: ${data1.projects?.length || 0}`);
    
    // Второй запрос (должен быть быстрее из-за кеширования)
    console.log('\n   Второй запрос (должен быть из кеша)...');
    const start2 = Date.now();
    const response2 = await fetch(`${BASE_URL}/api/portfolio-s3`);
    const data2 = await response2.json();
    const time2 = Date.now() - start2;
    
    console.log(`   Status: ${response2.status}`);
    console.log(`   Время: ${time2}ms`);
    console.log(`   Данные идентичны: ${JSON.stringify(data1) === JSON.stringify(data2) ? '✅' : '❌'}`);
    console.log(`   Ускорение: ${time1 > time2 ? `${Math.round((time1 - time2) / time1 * 100)}%` : '0%'}`);

    // 2. Тестируем s3-upload API с кешированием
    console.log('\n🔍 2. Тест S3 Upload API (с кешированием)...');
    
    const s3Start = Date.now();
    const s3Response = await fetch(`${BASE_URL}/api/s3-upload`);
    const s3Data = await s3Response.json();
    const s3Time = Date.now() - s3Start;
    
    console.log(`   Status: ${s3Response.status}`);
    console.log(`   Cache-Control: ${s3Response.headers.get('cache-control')}`);
    console.log(`   Время: ${s3Time}ms`);
    console.log(`   Files: ${s3Data.files?.length || 0}`);

    // 3. Проверяем главную страницу сайта
    console.log('\n🔍 3. Тест главной страницы сайта...');
    
    const pageStart = Date.now();
    const pageResponse = await fetch(`${BASE_URL}/`);
    const pageTime = Date.now() - pageStart;
    
    console.log(`   Status: ${pageResponse.status}`);
    console.log(`   Время загрузки: ${pageTime}ms`);
    console.log(`   Content-Type: ${pageResponse.headers.get('content-type')}`);
    
    if (pageResponse.ok) {
      const pageContent = await pageResponse.text();
      const hasPortfolio = pageContent.includes('portfolio') || pageContent.includes('Портфолио');
      const hasS3Urls = pageContent.includes('selcdn.ru') || pageContent.includes('s3');
      
      console.log(`   Есть портфолио: ${hasPortfolio ? '✅' : '❌'}`);
      console.log(`   Есть S3 URL: ${hasS3Urls ? '✅' : '❌'}`);
    }

    // 4. Проверяем доступность PDF файлов
    console.log('\n🔍 4. Тест доступности PDF файлов...');
    
    if (data1.projects && data1.projects.length > 0) {
      let accessibleCount = 0;
      
      for (let i = 0; i < Math.min(data1.projects.length, 3); i++) {
        const project = data1.projects[i];
        console.log(`   Проверка: ${project.title}`);
        
        try {
          const pdfResponse = await fetch(project.pdfUrl, { method: 'HEAD' });
          if (pdfResponse.ok) {
            accessibleCount++;
            console.log(`   ✅ Доступен (${pdfResponse.headers.get('content-length')} bytes)`);
          } else {
            console.log(`   ❌ Не доступен (${pdfResponse.status})`);
          }
        } catch (error) {
          console.log(`   ❌ Ошибка: ${error.message}`);
        }
      }
      
      console.log(`\n   Доступно файлов: ${accessibleCount}/${Math.min(data1.projects.length, 3)}`);
    }

    // 5. Проверяем заголовки кеширования
    console.log('\n🔍 5. Анализ заголовков кеширования...');
    
    const cacheHeaders = [
      'cache-control',
      'cdn-cache-control', 
      'vercel-cdn-cache-control',
      'etag',
      'last-modified'
    ];
    
    cacheHeaders.forEach(header => {
      const value = response1.headers.get(header);
      if (value) {
        console.log(`   ${header}: ${value}`);
      }
    });

    // 6. Итоговая оценка
    console.log('\n📊 Итоговая оценка:');
    
    const hasCacheControl = response1.headers.get('cache-control')?.includes('21600');
    const hasS3Data = data1.projects?.some(p => p.pdfUrl.includes('selcdn.ru'));
    const hasProjects = data1.projects?.length > 0;
    const pageWorks = pageResponse.ok;
    
    console.log(`   Кеширование настроено: ${hasCacheControl ? '✅' : '❌'}`);
    console.log(`   Данные из S3: ${hasS3Data ? '✅' : '❌'}`);
    console.log(`   Есть проекты: ${hasProjects ? '✅' : '❌'}`);
    console.log(`   Сайт работает: ${pageWorks ? '✅' : '❌'}`);
    
    const allGood = hasCacheControl && hasS3Data && hasProjects && pageWorks;
    
    if (allGood) {
      console.log('\n🎉 Отлично! Сайт успешно использует S3 с кешированием на 6 часов!');
    } else {
      console.log('\n⚠️  Есть проблемы с настройкой');
    }

    // 7. Рекомендации
    console.log('\n💡 Рекомендации:');
    if (!hasCacheControl) {
      console.log('   - Настройте кеширование в API роутах');
    }
    if (!hasS3Data) {
      console.log('   - Загрузите PDF файлы в S3 через seed-s3-initial.js');
    }
    if (!hasProjects) {
      console.log('   - Обновите Edge Config с данными портфолио');
    }
    if (time1 > 1000) {
      console.log('   - Оптимизируйте скорость загрузки данных');
    }

  } catch (error) {
    console.error('❌ Ошибка тестирования:', error.message);
    console.log('\n💡 Убедитесь что:');
    console.log('   1. Dev сервер запущен (npm run dev)');
    console.log('   2. PDF файлы загружены в S3');
    console.log('   3. Edge Config обновлен');
  }
}

// Запуск теста
testWebsiteCaching();
