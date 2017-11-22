'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThoughtSchema = new Schema({
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

module.exports = mongoose.model('Thought', ThoughtSchema );