#!/usr/bin/env node

// Тест фронтенда на получение данных из S3
require('dotenv').config({ path: '.env.local' });

const puppeteer = require('puppeteer');

async function testFrontendS3() {
  console.log('=== Тест фронтенда: получение данных из S3 ===');
  
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    // Включаем логирование сетевых запросов
    page.on('request', request => {
      if (request.url().includes('/api/portfolio')) {
        console.log(`🌐 Запрос: ${request.method()} ${request.url()}`);
      }
    });
    
    page.on('response', response => {
      if (response.url().includes('/api/portfolio')) {
        console.log(`📦 Ответ: ${response.status()} ${response.url()}`);
      }
    });
    
    // Переходим на главную страницу
    console.log('🚀 Открытие главной страницы...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    // Ждем загрузки портфолио
    await page.waitForTimeout(3000);
    
    // Проверяем консоль на наличие S3 URL
    const logs = await page.evaluate(() => {
      return console.logs.map(log => log.text);
    });
    
    console.log('\n📋 Логи из браузера:');
    logs.forEach(log => {
      if (log.includes('selcdn.ru') || log.includes('s3') || log.includes('portfolio')) {
        console.log(`   ${log}`);
      }
    });
    
    // Проверяем элементы портфолио
    const projects = await page.$$('[data-testid="portfolio-project"]');
    console.log(`\n📊 Найдено проектов на странице: ${projects.length}`);
    
    if (projects.length > 0) {
      for (let i = 0; i < Math.min(projects.length, 3); i++) {
        const project = projects[i];
        const title = await project.$eval('h3', el => el.textContent).catch(() => 'N/A');
        const pdfUrl = await project.$eval('a[href*="pdf"]', el => el.href).catch(() => 'N/A');
        
        console.log(`\n   Проект ${i + 1}:`);
        console.log(`   Название: ${title}`);
        console.log(`   PDF URL: ${pdfUrl}`);
        console.log(`   S3 URL: ${pdfUrl.includes('selcdn.ru') ? '✅' : '❌'}`);
      }
    }
    
    await browser.close();
    
    console.log('\n✅ Тест фронтенда завершен');
    
  } catch (error) {
    console.error('❌ Ошибка тестирования фронтенда:', error.message);
    console.log('\n💡 Убедитесь что:');
    console.log('   1. Установлен puppeteer: npm install puppeteer');
    console.log('   2. Dev сервер запущен на http://localhost:3000');
    console.log('   3. Данные портфолио содержат S3 URL');
  }
}

// Запуск теста
testFrontendS3();
