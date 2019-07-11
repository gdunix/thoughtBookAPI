import logger from '../../utils/logger';
import Movie from '../../models/Movies/movieModel';
import messages from '../../utils/constants';

export const list_all_movies = (req, res) => {
  Movie.find({})
    .exec((err, movies) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }

      res.json(movies);
    });
};

export const get_movies_with_paging = (req, res) => {
  const page = req.params.page;
  const limit = req.params.size;
  const skip = limit * (page - 1);

  Movie.find({ $and: [{ grade: { $gt: 0 } }, { seenAt: { $exists: true } }] })
    .sort({ seenAt: -1 })
    .limit(parseInt(limit))
    .skip(parseInt(skip))
    .select('_id title grade imageURL')
    .exec((err, movies) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }
      res.json(movies);
    })

};

export const create_a_movie = (req, res) => {
  const new_movie = new Movie(req.body);
  new_movie.grade = new_movie.grade || 0;
  new_movie.save((err, movie) => {
    if (err) {
      console.log(err);
      return res.status(500).send(messages.createMovieError);
    }
    Movie.
      findById(movie._id)
      .exec((err, movie) => {
        if (err) {
          logger.log('error', err);
          return res.status(500).send(messages.getMoviesError);
        }
        logger.log('info', 'New Movie Added - ' + movie);
        res.json(movie);
      });
  });
};

export const read_a_movie_full = (req, res) => {
  Movie.
    findById(req.params.movieId)
    .exec((err, movie) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }
      res.json(movie);
    });
};

export const read_a_movie = (req, res) => {
  Movie.
    findById(req.params.movieId)
    .exec((err, movie) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }

      res.json(movie);
    });
};

export const update_a_movie = (req, res) => {
  Movie.findOneAndUpdate({ _id: req.params.movieId }, req.body, { new: true })
    .populate('author')
    .populate('state')
    .exec((err, movie) => {
      if (err) {
        logger.log('error', err);
        return res.send(err);
      }

      res.json(movie);
    });
};

export const delete_a_movie = (req, res) => {
  Movie.remove({
    _id: req.params.movieId
  }, (err, movie) => {
    if (err) {
      logger.log('error', err);
      return res.send(err);
    }
    res.json({ message: 'Movie successfully deleted' });
  });
};

export const findMovieByTitle = (req, res) => {
  const title = req.params.title;
  Movie.find({ "title": new RegExp(title, 'i') }).sort({ title: -1 })
    .select('_id title release_date')
    .exec((err, movies) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }
      res.json(movies);
    })
}

export const findRecentlyWatched = (req, res) => {
  const limit = req.params.limit;
  Movie.find({ $and: [{ grade: { $gt: 0 } }, { seenAt: { $exists: true } }] }).sort({ seenAt: -1 }).limit(parseInt(limit))
    .select('_id title grade imageURL')
    .exec((err, movies) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }
      res.json(movies);
    })
}

export const releaseDates = (req, res) => {
  Movie.find({"grade": { $gt: 0} })
    .distinct('release_date')
    .exec((err, years) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }

      let releaseDates = years
        .map(year => parseInt(year))
        .sort((a, b) => {
          return b - a;
        });

      res.json(releaseDates);
    })
}

export const moviesByReleaseDate = (req, res) => {
  const dt = req.params.releaseDate;
  Movie.find({ "release_date": dt, "grade": { $gt: 0} }).sort({ grade: -1 })
    .select('_id title grade imageURL')
    .exec((err, movies) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }

      res.json(movies);
    })
}
