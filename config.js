import config from './env';

module.exports = config[process.env.NODE_ENV];
