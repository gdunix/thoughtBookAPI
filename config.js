var config = require('./env');

module.exports = config[process.env.NODE_ENV];
