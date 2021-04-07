const config = require('config');
const express = require('express');

const app = express();

/**
 * Middleware
 */
app.use((req, res, next) => {
  const date = new Date();
  console.log(`[${date.toLocaleDateString()} ${date.toLocaleTimeString()}][${req.method}] ${req.originalUrl}`);
  next();
});

/**
 * Routes
 */
app.get('/', async (req, res) => {
  res.json({ hello: 'world' });
});

/**
 * Startup
 */
const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log(`Express server is running on port: ${port}...`);
});
