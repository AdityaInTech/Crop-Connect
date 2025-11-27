// index.js
/*
const { createServer } = require('@vercel/node');
const app = require('./src/app');

module.exports = createServer(app);
*/
// index.js
module.exports = (req, res) => {
  res.status(200).send("Vercel deployment is working!");
};
