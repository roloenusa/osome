const config = require('config');
const mongoose = require('mongoose');

mongoose.connect(config.database.mongodb.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('connected to mongodb');
});

module.exports = database;
