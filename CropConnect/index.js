// index.js
const { createServer } = require('@vercel/node');
const app = require('./src/app');

module.exports = createServer(app);
