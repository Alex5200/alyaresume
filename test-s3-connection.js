#!/usr/bin/env node

// Тест подключения к Selectel S3
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

// Загрузка переменных окружения
require('dotenv').config({ path: '.env.local'});

async function testS3Connection() {
  console.log('=== Тест подключения к Selectel S3 ===');
  
  // Проверка переменных окружения
  const requiredVars = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'S3_BUCKET_NAME'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Отсутствуют переменные окружения:', missingVars.join(', '));
    console.log('Проверьте ваш .env.local файл');
    process.exit(1);
  }
  
  console.log('✅ Переменные окружения найдены');
  
  // Создание S3 клиента
  const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'ru-3',
    endpoint: process.env.S3_ENDPOINT, // Только из env
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
  });
  
  console.log('🔧 S3 клиент создан с параметрами:');
  console.log(`   Region: ${process.env.AWS_REGION || 'ru-3'}`);
  console.log(`   Endpoint: ${process.env.S3_ENDPOINT}`);
  console.log(`   Bucket: ${process.env.S3_BUCKET_NAME}`);
  
  try {
    // Тест получения списка файлов
    console.log('\n📋 Проверка списка файлов в бакете...');
    
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: 'portfolio/',
    });
    
    const response = await s3Client.send(command);
    
    console.log(`✅ Подключение успешно!`);
    console.log(`📁 Найдено файлов: ${response.Contents?.length || 0}`);
    
    if (response.Contents && response.Contents.length > 0) {
      console.log('\n📄 Список файлов:');
      response.Contents.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file.Key} (${file.Size} bytes)`);
        console.log(`      URL: ${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/${file.Key}`);
      });
    } else {
      console.log('ℹ️  Файлы не найдены. Попробуйте загрузить PDF файлы через админ панель или миграционный скрипт.');
    }
    
  } catch (error) {
    console.error('❌ Ошибка подключения к S3:');
    console.error('   Код:', error.Code || 'Unknown');
    console.error('   Сообщение:', error.message);
    
    if (error.Code === 'NoSuchBucket') {
      console.log('\n💡 Решение: Создайте бакет с именем', process.env.S3_BUCKET_NAME, 'в панели управления Selectel');
    } else if (error.Code === 'InvalidAccessKeyId') {
      console.log('\n💡 Решение: Проверьте AWS_ACCESS_KEY_ID в .env.local');
    } else if (error.Code === 'SignatureDoesNotMatch') {
      console.log('\n💡 Решение: Проверьте AWS_SECRET_ACCESS_KEY в .env.local');
    }
    
    process.exit(1);
  }
}

// Запуск теста
testS3Connection().catch(console.error);
