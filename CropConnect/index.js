// index.js
const app = require('./src/app');

module.exports = app;

// For local testing only
if (require.main === module) {
  const PORT = process.env.PORT || 5556;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
