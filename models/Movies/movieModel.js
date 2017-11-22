'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = Schema({
    title: {type: String, required: true},
    extId: {type: Number},
    director: {type: String, required: true},
    actors: [{name: String, order:Number, character: String}],
    overview: {type: String},
    status: {type: String},
    tagline: {type: String},
    release_date: {type: Number},
    imageURL: {type:String},
    updated: { type: Date, default: Date.now },
    seenAt: {type: Date},
    comments: {type: String},
    place: {type:String},
    grade: {type: Number, min: 0, max: 10},
    genres: [{type:String}],
    quotes: [{type: Schema.ObjectId, ref: 'Quote'}]
});
  
  //Export model
  module.exports = mongoose.model('Movie', MovieSchema);