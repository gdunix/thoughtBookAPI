import logger from '../../utils/logger';
import Book from '../../models/Books/bookModel';
import State from '../../models/Books/stateModel';
import Author from '../../models/Books/authorModel';
import Genre from '../../models/genreModel';
import Quote from '../../models/quoteModel';
import messages from '../../utils/constants';

function read_a_book_full(req, res) {
    Book.
    findById(req.params.bookId)
    .populate('author')
    .populate('state')
    .populate('genre')
    .exec(function (err, book) {
      if (err){
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError);  
      }

      res.json(book);
    });
};

export function list_all_books(req, res) {
    Book.find({})
    .populate('author')
    .populate('state')
    .populate('genres')
    .populate('quotes')
    .exec(function (err, books) {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError);  
      }

      res.json(books);
    });
};

export function create_a_book(req, res) {
  var new_book= new Book(req.body);
  new_book.save(function(err, book) {
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
      if (err){
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError); 
      };
      logger.log('info', 'New Book Added ' + book);
      res.json(book);
    });
  });
};
  
export function read_a_book_full(req, res) {
  Book.
  findById(req.params.bookId)
  .populate('author')
  .populate('state')
  .populate('genres')
  .populate('quotes')
  .exec(function (err, book) {
    if (err){
      logger.log('error', err);
      return res.status(500).send(messages.getBooksError);  
    }
    res.json(book);
  });
};

export function read_a_book(req, res) {
  Book.
  findById(req.params.bookId)
  .populate('author')
  .exec(function (err, book) {
    if (err){
      logger.log('error', err);
      return res.status(500).send(messages.getBooksError);  
    }
    res.json(book);
  });
};

export function findBooksByTitle(req, res) {
  var title = req.params.title;
  Book.find({ "title" : new RegExp(title, 'i') }).sort({title: -1})
  .select('_id title')
  .exec(function (err, books) {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getBooksError);   
    }
    res.json(books);
  })
}

export function update_a_book(req, res) {
  console.log(req.params.bookId);
  console.log(req.body);
  Book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true})
  .populate('author')
  .populate('state')
  .populate('genres')
  .populate('quotes')
  .exec(function(err, book) {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getBooksError);   
    }
    res.json(book);
  });
};

export function delete_a_book(req, res) {
  Book.remove({_id: req.params.bookId}, function(err, book) {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getBooksError);   
    }
    res.json({ message: 'Book successfully deleted' });
  });
};

export function list_all_byState(req, res) {
  var limit = req.params.limit,
      state = req.params.state;

  State.findOne({name: state}, function (error, state) {
    if (error) {
      logger.log('error', error);
      return res.status(500).send(messages.getBooksError);     
    }
    if(state === null) {
      return res.status(500).send(messages.getBooksError);
    }

    Book.find({state: state._id}).sort({name: -1}).limit(parseInt(limit))
    .populate('author')
    .populate('state')
    .exec(function (err, books) {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError);  
      }
      res.status(200).send(books);
    })
  })
};

export function list_all_bestbyGenre(req, res){
  var limit = req.params.limit,
      genreName = req.params.genreName;

  Genre.findOne({name: genreName}, function (error, genre) {
    if (error){
      logger.log('error', error);
      return res.status(500).send(messages.getBooksError);     
    }
    if(genre === null) {
      return res.status(500).send(messages.getBooksError);
    }
    
    Book.find({ genres: { $in: [genre._id] }}).sort({grade: -1}).limit(parseInt(limit))
    .populate('state')
    .exec(function (err, books) {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError);   
    }
    res.json(books);
    })
  })
}

export function list_all_ByAuthor(req, res){
  var id = req.params.authorId;

  Book.find({ author: id}).sort({grade: -1})
    .exec(function (err, books) {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.getBooksError);   
    }
    res.json(books);
    })
}

export function list_best(req, res){
  Book.find({}).sort({grade: -1}).limit(parseInt(limit))
  .exec(function (err, books) {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getBooksError); 
    }
    res.json(books);
  })
}

export function list_all_books_states(req, res) {
  State.find({}).exec(function(err, states) {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getBooksError); 
    }
        
    res.json(states);
});
}

export function create_book_quote(req, res){
  var bookId = req.params.bookId;
  var new_quote= new Quote(req.body);
  new_quote.save(function(err, quote) {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.getBooksError); 
    }
    Book.findById(bookId, function (error, book) {
      if (error) {
        logger.log('error', error);
        return res.status(500).send(messages.getBooksError); 
      }
      if (!book){
        return res.status(404).send(messages.getBooksError); 
      } else{
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

