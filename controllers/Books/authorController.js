require('../../models/Books/authorModel');
var mongoose = require('mongoose'),
    Author = mongoose.model('Author'),
    logger = require('../../utils/logger');

exports.add_author = function(req, res) {
    var new_author= new Author(req.body);
    new_author.save(function(err, author) {
        if (err){
            logger.log('error', err);
            return res.status(500).send(messages.getBooksError);  
        }
        
        res.json(author);
    });
    };
    
exports.list_all_authors = function(req, res) {
    Author.find({}, function(err, author) {
        if (err){
            logger.log('error', err);
            return res.status(500).send(messages.getBooksError);  
        }
            
        res.json(author);
    });
};
