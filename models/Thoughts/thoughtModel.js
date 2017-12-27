import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let ThoughtSchema = new Schema({
    name: {
      type: String,
      required: 'Enter a name for the Thought'
    },
    text: {
      type: String
    },
    Created_date: {
      type: Date,
      default: Date.now
    },
    order: {
      type: Number,
      default: 0
    }
  });

export default mongoose.model('Thought', ThoughtSchema );