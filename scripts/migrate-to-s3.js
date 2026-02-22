const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

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

const BUCKET = process.env.S3_BUCKET_NAME || '';

// Local PDF directory
const PDF_DIR = path.join(__dirname, '../public/pdf');

async function uploadFileToS3(filePath, key) {
  const fileContent = fs.readFileSync(filePath);
  
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: fileContent,
    ContentType: 'application/pdf',
    ACL: 'public-read',
  });

  await s3Client.send(command);
  
  return `${process.env.S3_ENDPOINT}/${BUCKET}/${key}`;
}

async function migratePDFs() {
  console.log('=== Starting PDF Migration to S3 ===');
  
  if (!BUCKET) {
    console.error('❌ S3_BUCKET_NAME not set in environment');
    process.exit(1);
  }

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error('❌ AWS credentials not configured');
    console.log('Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env.local');
    process.exit(1);
  }

  try {
    // Check if PDF directory exists
    if (!fs.existsSync(PDF_DIR)) {
      console.log('ℹ️ PDF directory does not exist, creating...');
      fs.mkdirSync(PDF_DIR, { recursive: true });
    }

    const files = fs.readdirSync(PDF_DIR);
    const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));

    console.log(`📁 Found ${pdfFiles.length} PDF files to migrate`);

    const migrationResults = [];

    for (const filename of pdfFiles) {
      const filePath = path.join(PDF_DIR, filename);
      const key = `portfolio/${Date.now()}_${filename}`;
      
      console.log(`⬆️  Uploading: ${filename}...`);
      
      try {
        const url = await uploadFileToS3(filePath, key);
        
        migrationResults.push({
          originalName: filename,
          s3Key: key,
          s3Url: url,
          status: 'success',
        });
        
        console.log(`✅ Uploaded: ${url}`);
      } catch (error) {
        console.error(`❌ Failed to upload ${filename}:`, error.message);
        migrationResults.push({
          originalName: filename,
          status: 'failed',
          error: error.message,
        });
      }
    }

    // Save migration report
    const reportPath = path.join(__dirname, '../migration-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(migrationResults, null, 2));
    
    console.log('\n=== Migration Complete ===');
    console.log(`✅ Successful: ${migrationResults.filter(r => r.status === 'success').length}`);
    console.log(`❌ Failed: ${migrationResults.filter(r => r.status === 'failed').length}`);
    console.log(`\n📄 Report saved to: ${reportPath}`);
    
    // Print updated portfolio data
    console.log('\n=== Updated Portfolio Data ===');
    const portfolioData = {
      heading: {
        main: "Портфолио работ",
        description: "Профессиональные чертежи и дизайн-проекты с детальной проработкой"
      },
      ctaButton: {
        text: "Заказать подобный проект",
        link: "#contact"
      },
      projects: migrationResults
        .filter(r => r.status === 'success')
        .map((r, index) => ({
          id: index + 1,
          title: r.originalName.replace('.pdf', ''),
          description: `Проект ${r.originalName.replace('.pdf', '')}`,
          pdfUrl: r.s3Url,
          category: "Портфолио",
          isActive: true,
          order: index + 1
        }))
    };
    
    console.log(JSON.stringify(portfolioData, null, 2));

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migratePDFs();
