import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let BookListSchema = mongoose.Schema({
  url: {type: String},
  text: {type: String},
  showRating: {type: Boolean},
  type: {type: String},
  query: {type: String},
});

export default mongoose.model('BookList', BookListSchema, 'bookLists');