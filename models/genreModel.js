var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = Schema(
  {
    name: {type: String, required: true, max: 100},
    category: {type: Schema.ObjectId, ref: 'Category', required: true}
  }
);

module.exports = mongoose.model('Genre', GenreSchema);