require('../../models/Books/authorModel');
var mongoose = require('mongoose'),
    Author = mongoose.model('Author');

exports.add_author = function(req, res) {
    console.log(req.body);
    var new_author= new Author(req.body);
    new_author.save(function(err, author) {
        if (err) {
            res.send(err);
        }
        
        res.json(author);
    });
    };
    
exports.list_all_authors = function(req, res) {
    Author.find({}, function(err, author) {
        if (err) {
            res.send(err);
        }
            
        res.json(author);
    });
};
