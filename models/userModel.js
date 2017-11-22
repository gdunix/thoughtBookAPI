var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    image: String,
    admin: Boolean,
    isEmailVerified: Boolean,
    verifyEmailToken: String,
    verifyEmailTokenExpires: Date
  });

module.exports = mongoose.model('User', UserSchema );
