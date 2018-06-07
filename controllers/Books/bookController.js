import logger from '../../utils/logger';
import Book from '../../models/Books/bookModel';
import State from '../../models/Books/stateModel';
import Author from '../../models/Books/authorModel';
import Genre from '../../models/genreModel';
import Quote from '../../models/quoteModel';
import BookList from '../../models/Books/bookListModel';
import messages from '../../utils/constants';

export const list_all_books = (req, res) => {
  Book.find({})
    .populate('author')
    .populate('state')
    .populate('genres')
    .populate('quotes')
    .exec((err, books) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError);
      }

      res.json(books);
    });
};

export const create_a_book = (req, res) => {
  const new_book = new Book(req.body);
  new_book.save(function (err, book) {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getBooksError);
    };

    Book.
      findById(book._id)
      .populate('author')
      .populate('state')
      .populate('genres')
      .populate('quotes')
      .exec(function (err, book) {
        if (err) {
          logger.log('error', err);
          return res.status(500).send(messages.getBooksError);
        };
        logger.log('info', 'New Book Added ' + book);
        res.json(book);
      });
  });
};

export const read_a_book_full = (req, res) => {
  Book.
    findById(req.params.bookId)
    .populate('author')
    .populate('state')
    .populate('genres')
    .populate('quotes')
    .exec((err, book) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError);
      }

      res.json(book);
    });
};

export const read_a_book = (req, res) => {
  Book.
    findById(req.params.bookId)
    .populate('author')
    .exec((err, book) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError);
      }

      res.json(book);
    });
};

export const findBooksByTitle = (req, res) => {
  const title = req.params.title;
  Book.find({ "title": new RegExp(title, 'i') }).sort({ title: -1 })
    .select('_id title')
    .exec((err, books) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError);
      }

      res.json(books);
    })
}

export const update_a_book = (req, res) => {
  Book.findOneAndUpdate({ _id: req.params.bookId }, req.body, { new: true })
    .populate('author')
    .populate('state')
    .populate('genres')
    .populate('quotes')
    .exec((err, book) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError);
      }

      res.json(book);
    });
};

export const delete_a_book = (req, res) => {
  Book.remove({ _id: req.params.bookId }, (err, book) => {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getBooksError);
    }

    res.json({ message: 'Book successfully deleted' });
  });
};

export const list_all_byState = (req, res) => {
  const limit = req.params.limit;
  const state = req.params.state;

  State.findOne({ name: state }, (error, state) => {
    if (error) {
      logger.log('error', error);
      return res.status(500).send(messages.getBooksError);
    }
    if (state === null) {
      return res.status(500).send(messages.getBooksError);
    }

    Book.find({ state: state._id }).sort({ name: -1 }).limit(parseInt(limit))
      .populate('author')
      .populate('state')
      .exec((err, books) => {
        if (err) {
          logger.log('error', err);
          return res.status(500).send(messages.getBooksError);
        }

        res.status(200).send(books);
      })
  })
};

export const list_all_bestbyGenre = (req, res) => {
  const limit = req.params.limit;
  const genreName = req.params.genreName;

  Genre.findOne({ name: genreName }, (error, genre) => {
    if (error) {
      logger.log('error', error);
      return res.status(500).send(messages.getBooksError);
    }
    if (genre === null) {
      return res.status(500).send(messages.getBooksError);
    }

    Book.find({ genres: { $in: [genre._id] } }).sort({ grade: -1 }).limit(parseInt(limit))
      .populate('state')
      .exec((err, books) => {
        if (err) {
          logger.log('error', err);
          return res.status(500).send(messages.getBooksError);
        }

        res.json(books);
      })
  })
}

export const list_all_ByAuthor = (req, res) => {
  const id = req.params.authorId;

  Book.find({ author: id }).sort({ grade: -1 })
    .exec((err, books) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError);
      }

      res.json(books);
    })
}

export const list_best = (req, res) => {
  Book.find({}).sort({ grade: -1 }).limit(parseInt(limit))
    .exec((err, books) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError);
      }

      res.json(books);
    })
}

export const list_all_books_states = (req, res) => {
  State.find({}).exec((err, states) => {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getBooksError);
    }

    res.json(states);
  });
}

export const create_book_quote = (req, res) => {
  const bookId = req.params.bookId;
  const new_quote = new Quote(req.body);
  new_quote.save((err, quote) => {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getBooksError);
    }
    Book.findById(bookId, (error, book) => {
      if (error) {
        logger.log('error', error);
        return res.status(500).send(messages.getBooksError);
      }
      if (!book) {
        return res.status(404).send(messages.getBooksError);
      } else {
        book.quotes.push(new_quote);
        book.save(function (err, updatedBook) {
          if (err) {
            logger.log('error', err);
            return res.status(500).send(messages.err);
          }
          res.send(updatedBook);
        });
      }
    })
  });
}

export const list_all_bookLists = (req, res) => {
  BookList.find({})
    .exec((err, bookLists) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError);
      }
      
      res.json(bookLists);
    });
};

