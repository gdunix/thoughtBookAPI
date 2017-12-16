require('../../models/Movies/movieModel');
var mongoose = require('mongoose'),
Movie = mongoose.model('Movie'),
logger = require('../../utils/logger'),
messages = require('../../utils/constants');


exports.list_all_movies = function(req, res) {
    Movie.find({})
    .exec(function (err, movies) {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);  
      }

      res.json(movies);
    });
};

exports.create_a_movie = function(req, res) {
  var new_movie= new Movie(req.body);
  new_movie.save(function(err, movie) {
    if (err){
      console.log(err);
      return res.status(500).send(messages.createMovieError); 
    }
    Movie.
    findById(movie._id)
    .exec(function (err, movie) {
      if (err){
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);  
      }
      logger.log('info', 'New Movie Added - ' + movie);
      res.json(movie);
    });
  });
};
  
exports.read_a_movie_full = function(req, res) {
  Movie.
  findById(req.params.movieId)
  .exec(function (err, movie) {
    if (err){
      logger.log('error', err);
      return res.status(500).send(messages.getMoviesError);  
    }
    res.json(movie);
  });
};

exports.read_a_movie = function(req, res) {
  Movie.
  findById(req.params.movieId)
  .exec(function (err, movie) {
    if (err){
      logger.log('error', err);
      return res.status(500).send(messages.getMoviesError);  
    }
    res.json(movie);
  });
};

exports.update_a_movie = function(req, res) {
  Movie.findOneAndUpdate({_id: req.params.movieId}, req.body, {new: true})
  .populate('author')
  .populate('state')
  .exec(function(err, movie) {
    if (err) {
      logger.log('error', err);
      return res.send(err);
    }
      
    res.json(movie);
  });
};

exports.delete_a_movie = function(req, res) {
  Movie.remove({
    _id: req.params.movieId
  }, function(err, movie) {
    if (err) {
      logger.log('error', err);
      return res.send(err);
    }
    res.json({ message: 'Movie successfully deleted' });
  });
};

exports.findMovieByTitle = function(req, res) {
  var title = req.params.title;
  Movie.find({ "title" : new RegExp(title, 'i') }).sort({title: -1})
  .select('_id title release_date')
  .exec(function (err, movies) {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getMoviesError);   
    }
    res.json(movies);
  })
}

exports.findRecentlyWatched = function(req, res) {
  var limit = req.params.limit;
  Movie.find({ $and: [{grade: { $gt: 0}}, {seenAt: {$exists: true}} ]}).sort({seenAt: -1}).limit(parseInt(limit))
  .select('_id title grade imageURL')
  .exec(function (err, movies) {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getMoviesError);   
    }
    res.json(movies);
  })
}

exports.releaseDates = function(req, res) {
  Movie.find()
  .distinct('release_date')
  .exec(function (err, years) {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getMoviesError);   
    }
    
    var releaseDates = years.map(year => {
      return parseInt(year)
    }).sort(function(a, b) {
      return b - a;
    });
    res.json(releaseDates);
  }) 
}

exports.moviesByReleaseDate = function(req, res) {
  var dt = req.params.releaseDate;
  Movie.find({ "release_date" : dt }).sort({grade: -1})
  .select('_id title grade imageURL')
  .exec(function (err, movies) {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getMoviesError);   
    }
    res.json(movies);
  })
}