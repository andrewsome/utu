const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const cryptoSchema = new Schema({
  currency: String,
  date: String,
  open: String,
  high: String,
  low: String,
  close: String,
  volume: String,
  marketCap: String,
}, {
  typeKey: '$type'
});

const cryptoModel = mongoose.model('Crypto', cryptoSchema);

module.exports = cryptoModel;