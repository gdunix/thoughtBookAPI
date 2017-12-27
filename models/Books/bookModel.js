import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let BookSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {type: Schema.ObjectId, ref: 'Author', required: true},
  comments: {type: String},
  details: {type: String},
  imageURL: {type: String},
  updated: { type: Date, default: Date.now },
  readStartDate: {type: Date},
  readEndDate: {type: Date},
  readAt: {type: Date},
  grade: {type: Number, required: true, min: 0, max: 10},
  state: {type: Schema.ObjectId, ref: 'State', required: true},
  genres: [{type: Schema.ObjectId, ref: 'Genre', required: true}],
  quotes: [{type: Schema.ObjectId, ref: 'Quote'}]
});

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

export default mongoose.model('Book', BookSchema);