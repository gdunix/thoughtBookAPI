import mongoose from 'mongoose';

let AuthorSchema = mongoose.Schema(
  {
    name: {type: String, required: true, max: 100}
  }
);

export default mongoose.model('Author', AuthorSchema);