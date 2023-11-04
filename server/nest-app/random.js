const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Random Secret Key:', secretKey);
