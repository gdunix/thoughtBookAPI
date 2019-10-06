import bcrypt from 'bcryptjs';

import logger from '../../utils/logger';
import User from '../../models/userModel';
import * as utils from '../../utils/index';

const isUserUnique = (reqBody, cb) => {
  var username = reqBody.username ? reqBody.username.trim() : '';
  var email = reqBody.email ? reqBody.email.trim() : '';

  User.findOne({
    $or: [{
      'username': new RegExp(["^", username, "$"].join(""), "i")
    }, {
      'email': new RegExp(["^", email, "$"].join(""), "i")
    }]
  }, function (err, user) {
    if (err) {
      throw err;
    }

    if (!user) {
      cb();
      return;
    }

    var err;
    if (user.username === username) {
      err = {};
      err.username = '"' + username + '" is not unique';
    }
    if (user.email === email) {
      err = err ? err : {};
      err.email = '"' + email + '" is not unique';
    }

    cb(err);
  });
}

export const signup = (req, res) => {
  const body = req.body;
  isUserUnique(body, err => {
    if (err) {
      logger.log('error', err);
      return res.status(403).json(err);
    };

    const hash = bcrypt.hashSync(body.password.trim(), 10);
    const user = new User({
      name: body.fullName.trim(),
      username: body.username.trim(),
      email: body.email.trim(),
      password: hash,
      admin: false,
      isEmailVerified: false
    });

    user.save(function (err, user) {
      if (err) {
        logger.log('error', err);
        return res.status(500).json(err);
      }
      const token = utils.generateToken(user);
      res.json({
        user: user,
        token: token
      });
    });
  });
}

export const signin = (req, res) => {
  User
    .findOne({ username: req.body.username })
    .select({
      __v: 0,
      updatedAt: 0,
      createdAt: 0
    }) //make sure to not return password (although it is hashed using bcrypt)
    .exec((err, user) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).json(err);
      };

      if (!user) {
        return res.status(401).json({
          error: true,
          message: 'User does not exist'
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, valid) => {
        if (err) {
          logger.log('error', err);
          return res.status(500).json(err);
        };
        if (!valid) {
          return res.status(401).json({
            error: true,
            message: 'Username or Password is Wrong'
          });
        } else {
          let token = utils.generateToken(user);
          user = utils.getCleanUser(user);
          return res.json({
            user: user,
            token: token
          });
        }
      });
    });
}

export const getUserFromToken = (req, res) => {
  var token = req.body.token || req.query.token
  if (!token) {
    logger.log('error', 'Must pass token');
    return res.status(401).json({ message: 'Must pass token' });
  }

  utils.verifyToken(token, (err, user) => {
    if (err) {
      logger.log('error', err);
      return res.json({
        user: null,
        token: null,
        success: false,
        message: 'Error occured'
      });
    }
    User.findById({ '_id': user._id }, (err, user) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).json(err);
      };
      user = utils.getCleanUser(user);
      //Note: you can renew token by creating new token(i.e.    
      //refresh it)w/ new expiration time at this point, but I’m 
      //passing the old token back.
      // var token = utils.generateToken(user);
      res.json({
        user: user,
        token: token,
        success: true,
        message: 'Success'
      });
    });
  });
}
