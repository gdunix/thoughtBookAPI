require('../models/genreModel');
require('../models/categoryModel');
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
                    res.send(err);
                }
                
                res.json(genre);
            });
        }       
    });
};
    
exports.list_all_book_genres = function(req, res) {
    console.log('vomvo')
    Category.findOne({name: 'Books'}, function (error, category) {
        console.log(category)
        if (error) {
            return res.send(error);
        }
        Genre.find({category: category._id})
            .select('_id name')
            .exec(function(err, genres) {
                if (err) {
                    res.send(err);
                }
                    
                res.json(genres);
            });
    })
    
};