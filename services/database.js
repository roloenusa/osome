const config = require('config');
const mongoose = require('mongoose');

console.log('---------', config.database.mongodb.url)
mongoose.connect(config.database.mongodb.url, {
// mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('connected to mongodb');
});

module.exports = database;
