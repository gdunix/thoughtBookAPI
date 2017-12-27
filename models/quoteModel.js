import mongoose from 'mongoose';

let QuoteSchema = mongoose.Schema(
  {
    name: {type: String, max: 100},
    text: {type: String, required: true}
  }
);

export default mongoose.model('Quote', QuoteSchema);