const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const fs = require('fs');

const password = 'admin123';
const hash = bcrypt.hashSync(password, 12);
const secret = crypto.randomBytes(32).toString('base64');

const envContent = `# Admin Panel Configuration
# Generated: ${new Date().toISOString()}

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_HASHED_PASSWORD=${hash}

# NextAuth Configuration
NEXTAUTH_SECRET=${secret}
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
# ADMIN_EMAILS=admin@example.com
`;

fs.writeFileSync('.env.local', envContent);
console.log('✅ .env.local created successfully!');
console.log('');
console.log('Credentials:');
console.log('  Email: admin@example.com');
console.log('  Password: admin123');
console.log('');
console.log('Hash length:', hash.length, 'characters');
console.log('Hash preview:', hash.substring(0, 30) + '...');
