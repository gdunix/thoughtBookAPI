var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StateSchema = Schema({
    name: {type: String, required: true, max: 100}
});

//Export model
module.exports = mongoose.model('State', StateSchema, 'states');