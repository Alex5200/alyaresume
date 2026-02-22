const bcrypt = require('bcryptjs');

// Generate hash for password
const password = process.argv[2] || 'admin123';
const hash = bcrypt.hashSync(password, 12);

console.log('Password:', password);
console.log('Hash:', hash);
console.log('');
console.log('Add this to your .env.local:');
console.log(`ADMIN_HASHED_PASSWORD=${hash}`);
console.log('');
console.log('Add this to your .env.local:');
console.log(`ADMIN_EMAIL=admin@example.com`);
console.log(`NEXTAUTH_SECRET=${require('crypto').randomBytes(32).toString('base64')}`);
console.log(`NEXTAUTH_URL=http://localhost:3000`);
