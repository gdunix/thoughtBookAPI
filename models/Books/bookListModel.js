import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let BookListSchema = mongoose.Schema({
  url: {type: String},
  name: {type: String},
  showRating: {type: Boolean}
});

export default mongoose.model('BookList', BookListSchema, 'bookLists');