var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuoteSchema = Schema(
  {
    name: {type: String, max: 100},
    text: {type: String, required: true}
  }
);

module.exports = mongoose.model('Quote', QuoteSchema);