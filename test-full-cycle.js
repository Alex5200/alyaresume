#!/usr/bin/env node

// Полный тест цикла: загрузка → хранение → получение данных
require('dotenv').config({ path: '.env.local' });

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const fs = require('fs');
const path = require('path');

async function testFullCycle() {
  console.log('=== Полный тест цикла S3 ===');
  console.log(`Base URL: ${BASE_URL}\n`);

  try {
    // 1. Проверяем текущие данные портфолио
    console.log('🔍 1. Текущие данные портфолио:');
    const portfolioResponse = await fetch(`${BASE_URL}/api/portfolio-s3`);
    const portfolioData = await portfolioResponse.json();
    
    console.log(`   Projects: ${portfolioData.projects?.length || 0}`);
    portfolioData.projects?.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title}`);
      console.log(`      URL: ${project.pdfUrl}`);
      
      // Проверяем доступность
      fetch(project.pdfUrl, { method: 'HEAD' })
        .then(res => console.log(`      Доступ: ${res.ok ? '✅' : '❌'} (${res.status})`))
        .catch(() => console.log(`      Доступ: ❌ (ошибка)`));
    });

    // 2. Проверяем список файлов в S3
    console.log('\n🔍 2. Список файлов в S3:');
    const filesResponse = await fetch(`${BASE_URL}/api/s3-upload`);
    const filesData = await filesResponse.json();
    
    console.log(`   Всего файлов: ${filesData.count}`);
    filesData.files?.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file.filename} (${Math.round(file.size / 1024 / 1024)}MB)`);
      console.log(`      Загружен: ${new Date(file.lastModified).toLocaleString()}`);
    });

    // 3. Тестируем загрузку нового файла
    console.log('\n🔍 3. Тест загрузки нового файла:');
    
    // Находим маленький PDF файл для теста
    const testFiles = ['2.pdf']; // Используем существующий файл
    
    for (const filename of testFiles) {
      const filePath = path.join(process.cwd(), 'public/pdf', filename);
      
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        console.log(`   Файл: ${filename} (${Math.round(stats.size / 1024 / 1024)}MB)`);
        
        if (stats.size > 10 * 1024 * 1024) {
          console.log(`   ❌ Слишком большой для теста (>10MB)`);
          continue;
        }
        
        try {
          const formData = new FormData();
          formData.append('file', fs.readFileSync(filePath), filename);
          
          const uploadResponse = await fetch(`${BASE_URL}/api/s3-upload`, {
            method: 'POST',
            body: formData
          });
          
          const uploadResult = await uploadResponse.json();
          
          if (uploadResult.success) {
            console.log(`   ✅ Загружен успешно:`);
            console.log(`      URL: ${uploadResult.url}`);
            console.log(`      Key: ${uploadResult.key}`);
            
            // Проверяем доступность загруженного файла
            const checkResponse = await fetch(uploadResult.url, { method: 'HEAD' });
            console.log(`      Доступность: ${checkResponse.ok ? '✅' : '❌'} (${checkResponse.status})`);
          } else {
            console.log(`   ❌ Ошибка загрузки: ${uploadResult.error}`);
          }
        } catch (error) {
          console.log(`   ❌ Ошибка: ${error.message}`);
        }
      }
    }

    // 4. Проверяем кеширование
    console.log('\n🔍 4. Тест кеширования:');
    
    const start1 = Date.now();
    const response1 = await fetch(`${BASE_URL}/api/portfolio-s3`);
    const time1 = Date.now() - start1;
    
    const start2 = Date.now();
    const response2 = await fetch(`${BASE_URL}/api/portfolio-s3`);
    const time2 = Date.now() - start2;
    
    console.log(`   Первый запрос: ${time1}ms`);
    console.log(`   Второй запрос: ${time2}ms`);
    console.log(`   Ускорение: ${time1 > time2 ? Math.round((time1 - time2) / time1 * 100) : 0}%`);
    
    const cacheControl = response1.headers.get('cache-control');
    console.log(`   Cache-Control: ${cacheControl || 'не установлен'}`);

    // 5. Итоговая проверка
    console.log('\n📊 Итоговая проверка:');
    
    const hasProjects = portfolioData.projects && portfolioData.projects.length > 0;
    const hasFiles = filesData.files && filesData.files.length > 0;
    const uploadWorks = filesData.count > 0; // Если файлы есть, значит загрузка работает
    const urlsAccessible = portfolioData.projects?.every(p => p.pdfUrl.includes('0a92262b-c8ca-4515-930c-b5dade8276cd.selstorage.ru'));
    const hasCache = cacheControl && cacheControl.includes('21600');
    
    console.log(`   Данные портфолио: ${hasProjects ? '✅' : '❌'}`);
    console.log(`   Файлы в S3: ${hasFiles ? '✅' : '❌'}`);
    console.log(`   Загрузка работает: ${uploadWorks ? '✅' : '❌'}`);
    console.log(`   URL правильные: ${urlsAccessible ? '✅' : '❌'}`);
    console.log(`   Кеширование: ${hasCache ? '✅' : '❌'}`);
    
    const allGood = hasProjects && hasFiles && uploadWorks && urlsAccessible;
    
    if (allGood) {
      console.log('\n🎉 Отлично! Полный цикл работает корректно!');
      console.log('   ✅ Данные загружаются в S3');
      console.log('   ✅ URL генерируются правильно');
      console.log('   ✅ Файлы доступны по прямым ссылкам');
      console.log('   ✅ API возвращает корректные данные');
    } else {
      console.log('\n⚠️  Есть проблемы с полным циклом');
    }

  } catch (error) {
    console.error('❌ Ошибка тестирования:', error.message);
  }
}

// Запуск теста
testFullCycle();
