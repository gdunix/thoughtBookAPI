require('../models/genreModel');
require('../models/categoryModel');
logger = require('../utils/logger');
var mongoose = require('mongoose'),
    Genre = mongoose.model('Genre'),
    Category = mongoose.model('Category');

exports.add_book_genre = function(req, res) {
    Category.findOne({name: 'Books'}, function (error, category) {
        if(category) {
            var new_genre= new Genre(req.body);
            new_genre.category = category;
            new_genre.save(function(err, genre) {
                if (err) {
                    logger.log('error', err);
                    return res.send(err);
                }
                
                res.json(genre);
            });
        }       
    });
};
    
exports.list_all_book_genres = function(req, res) {
    Category.findOne({name: 'Books'}, function (error, category) {
        if (error) {
            logger.log('error', err);
            return res.send(error);
        }
        Genre.find({category: category._id})
            .select('_id name')
            .exec(function(err, genres) {
                if (err) {
                    logger.log('error', err);
                    return res.send(err);
                }
                    
                res.json(genres);
            });
    })
    
};