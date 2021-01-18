import logger from '../../utils/logger';
import Movie from '../../models/Movies/movieModel';
import Quote from '../../models/quoteModel';
import messages from '../../utils/constants';

import { actions as quoteActions } from '../Quotes';

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
    .populate('quotes')
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
    .populate('quotes')
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

export const moviesBest = (req, res) => {
  const limit = req.params.limit || 20;
  Movie.find({ $and: [{ grade: { $gt: 4 } }, { seenAt: { $exists: true } }] }).sort({ grade: -1, release_date: 1 }).limit(parseInt(limit))
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
  Movie.find({ "grade": { $gt: 0 } })
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
  Movie.find({ "release_date": dt, "grade": { $gt: 0 } }).sort({ grade: -1 })
    .select('_id title grade imageURL')
    .exec((err, movies) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }

      res.json(movies);
    })
}

export const getMoviesWithQuotes = (req, res) => {
  Movie.find({ quotes: { $exists: true }, $where: 'this.quotes.length>0' })
    .select('_id title grade imageURL quotes')
    .exec((err, movies) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }

      res.json(movies);
    })
}

export const getQuotes = (req, res) => {
  Quote.find({})
    .exec((err, quotes) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send('Quotes not found');
      }

      res.json(quotes);
    });
};

export const getMovieQuotes = async (req, res) => {
  const _id = req.params.movieId;
  if (_id) {
    Movie.
      findById(_id)
      .populate('quotes')
      .exec((err, movie) => {
        if (err) {
          logger.log('error', err);
          console.log(err)
          return res.status(500).send('No id provided')
        }
        res.json(movie.quotes);
      });
  } else {
    return res.status(500).send('No id provided');
  }
};

export const updateMovieQuotes = async (req, res) => {
  const _id = req.params.movieId;
  if (_id) {
    try {
      const movie = await Movie.findOne({ _id });
      if (!movie)
        return res.status(500).send('Movie found');

      let movieQuotes = [];
      const quotes = req.body;
      console.log(quotes);
      for (const q of quotes) {
        if (!q._id) {
          console.log('add', q);
          const newQuoteRes = await quoteActions.addQuote(q.text);
          console.log(newQuoteRes)
          if (newQuoteRes.status === 200) {
            movieQuotes.push(newQuoteRes.data._id.toString());
          }
        } else {
          console.log('update', q);
          await quoteActions.updateQuote(q._id, q.text);
          movieQuotes.push(q._id);
        }
      };
      console.log('movieQuotes', movieQuotes);
      let quotesToRemove = [];
      if (quotes.length === movieQuotes.length) {
        quotesToRemove = movie.quotes.filter(q => !movieQuotes.includes(q._id.toString()));
        movie.quotes = movieQuotes;
      }
      await movie.save();
      if (quotesToRemove) {
        console.log('remove', quotesToRemove);
        Quote.deleteMany({ _id: { $in: quotesToRemove } }, err =>
          console.log('deleteMany', err))
      }

      Movie.
        findById(_id)
        .populate('quotes')
        .exec((err, movie) => {
          if (err) {
            logger.log('error', err);
            console.log(err)
            return res.status(500).send('No id provided')
          }
          res.json(movie);
        });
    } catch (err) {
      console.log(err)
      return res.status(500).send('Error occured');
    }
  } else {
    return res.status(500).send('No movieId');
  }
};

export const updateMovieImage = async (req, res) => {
  const _id = req.params.movieId;
  const mainImage = req.body.mainImage;
  if (_id && !!mainImage) {
    const movie = await Movie.findOne({ _id });
    if (!movie)
      return res.status(500).send('Movie found');
    try {
      movie.imageURL = mainImage;
      await movie.save();

      res.json(movie);
    } catch (err) {
      console.log(err)
      return res.status(500).send('Error occured');
    }

  } else {
    return res.status(500).send('Invalid movieId or imageURL');
  }
}

export const addMovieQuote = (req, res) => {
  Movie.
    findById(req.params.movieId)
    .exec((err, movie) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }
      let quote = new Quote();
      quote.text = req.body.text;
      quote.save((err, quote) => {
        if (err) {
          logger.log('error', err);
          return res.status(500).send('Quote not saved');
        }

        movie.quotes = [...movie.quotes, quote];
        movie.save((error, movie) => {
          if (error) {
            logger.log('error', err);
            return res.status(500).send(messages.getMoviesError);
          }

          res.json(movie);
        })
      })
    })
}

export const deleteMovieQuote = (req, res) => {
  const quoteId = req.params.quoteId;
  if (quoteId) {
    Quote.
      deleteOne({ _id: req.params.quoteId })
      .exec((err) => {
        if (err) {
          console.log(err)
          logger.log('error', err);
          return res.status(500).send(messages.getMoviesError);
        }
        Movie.find({ quotes: quoteId })
          .exec((err, movies) => {
            if (err) {
              logger.log('error', err);
              return res.status(500).send('Quotes not found');
            }

            if (movies[0]) {
              console.log(movies[0].title)
              let mv = movies[0];
              mv.quotes = mv.quotes.filter(f => f != quoteId);
              mv.save((error, movie) => {
                if (error) {
                  logger.log('error', err);
                  return res.status(500).send(messages.getMoviesError);
                }

                res.json(movie);
              })
            } else {
              return res.status(200);
            }
          });
      })
  } else {
    return res.status(500).send('Wrong quoteId');
  }
}

export const bestof = (req, res) => {
  const from = req.params.from || 0;
  const to = req.params.to || 0;
  if (to <= from) {
    return res.status(500).send('Invalid params');
  }

  Movie.find({
    $and: [
      { release_date: { $gt: parseInt(from) - 1, $lt: parseInt(to) + 1 } },
      { grade: { $gt: 4 } },
      { seenAt: { $exists: true } }
    ]
  }).sort({ grade: -1, release_date: 1 })
    .select('_id title grade imageURL')
    .exec((err, movies) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }
      res.json(movies);
    })
}

export const findMoviesByDirector = (req, res) => {
  const director = req.params.director || '';
  Movie.find({ "director": director, "grade": { $gt: 0 } }).sort({ grade: -1 })
    .select('_id title grade imageURL')
    .exec((err, movies) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }

      res.json(movies);
    })
};

export const getDirectors = (_, res) => {
  Movie.find({ "grade": { $gt: 0 } })
    .distinct('director')
    .exec((err, directors) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }

      res.json(directors.sort());
    })
};

export const getDirectorsCount = (_, res) => {
  Movie.aggregate([
    { $match: { "grade": { $gt: 0 } } },
    {
      $group: {
        _id: "$director",
        sum: { $sum: 1}
      }
    },
    {
      $sort: { "_id": 1 },
    }
  ])
    .exec((err, directors) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getMoviesError);
      }

      res.json(directors.sort());
    })
};
