#!/usr/bin/env node

// Тест API эндпоинтов для S3
require('dotenv').config({ path: '.env.local' });

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

async function testEndpoint(path, method = 'GET', body = null) {
  try {
    console.log(`\n🔍 Тест ${method} ${path}`);
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(`${BASE_URL}${path}`, options);
    const data = await response.json();
    
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log(`   ✅ Успешно`);
    } else {
      console.log(`   ❌ Ошибка: ${data.error || 'Unknown error'}`);
    }
    
    return { success: response.ok, data };
  } catch (error) {
    console.error(`   ❌ Ошибка запроса:`, error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('=== Тест API эндпоинтов ===');
  console.log(`Base URL: ${BASE_URL}`);
  
  // Тест 1: Получение данных портфолио из S3
  await testEndpoint('/api/portfolio-s3');
  
  // Тест 2: Получение списка файлов из S3
  await testEndpoint('/api/s3-upload');
  
  // Тест 3: Проверка старого API (должен работать с Edge Config)
  console.log('\n📝 Проверка старого API для сравнения:');
  await testEndpoint('/api/portfolio');
  
  console.log('\n=== Завершено ===');
  console.log('💡 Если все тесты успешны, ваше приложение готово к работе с Selectel S3!');
  console.log('💡 Если есть ошибки, проверьте:');
  console.log('   1. Запущен ли dev сервер (npm run dev)');
  console.log('   2. Правильность переменных в .env.local');
  console.log('   3. Создан ли бакет в Selectel');
}

// Запуск тестов
runTests().catch(console.error);
