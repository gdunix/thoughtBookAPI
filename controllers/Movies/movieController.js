import logger from '../../utils/logger';
import Movie from '../../models/Movies/movieModel';
import messages from '../../utils/constants';

export function list_all_movies(req, res) {
    Movie.find({})
    .exec(function (err, movies) {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);  
      }

      res.json(movies);
    });
};

export function create_a_movie(req, res) {
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
  
export function read_a_movie_full(req, res) {
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

export function read_a_movie(req, res) {
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

export function update_a_movie(req, res) {
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

export function delete_a_movie(req, res) {
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

export function findMovieByTitle(req, res) {
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

export function findRecentlyWatched(req, res) {
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

export function releaseDates(req, res) {
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

export function moviesByReleaseDate(req, res) {
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
