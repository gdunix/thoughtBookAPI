import mongoose from 'mongoose';

let CategorySchema = mongoose.Schema(
  {
    name: {type: String, required: true, max: 100}
  }
);

export default mongoose.model('Category', CategorySchema);