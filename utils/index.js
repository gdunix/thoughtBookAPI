var jwt = require('jsonwebtoken'),
    config = require('../config');

exports.generateToken = function(user) {
    //1. Dont use password and other sensitive fields
    //2. Use fields that are useful in other parts of the     
    //app/collections/models
    var u = {
        name: user.name,
        username: user.username,
        admin: user.admin,
        _id: user._id.toString(),
        image: user.image,
        isEmailVerified: user.isEmailVerified //used to prevent creating posts w/o verifying emails
      };
    return token = jwt.sign(u, config.JWT_SECRET.value, {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

//strips internal fields like password and verifyEmailToken etc
exports.getCleanUser = function(user) {
  if(!user) return {};
  
  var u = user.toJSON();
  return {
    name: u.name,
    username: u.username,
    email: u.email
  }
}

exports.verifyToken = function(token, cb) {
  jwt.verify(token, config.JWT_SECRET.value, function(err, user) {
      cb(err, user);
  });
}


