var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = Schema(
  {
    name: {type: String, required: true, max: 100}
  }
);

module.exports = mongoose.model('Category', CategorySchema);