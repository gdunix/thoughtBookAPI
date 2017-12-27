import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let GenreSchema = mongoose.Schema(
  {
    name: {type: String, required: true, max: 100},
    category: {type: Schema.ObjectId, ref: 'Category', required: true}
  }
);

export default mongoose.model('Genre', GenreSchema);