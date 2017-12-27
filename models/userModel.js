import mongoose from 'mongoose';

let UserSchema = mongoose.Schema({
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

export default mongoose.model('User', UserSchema );
