var router = require('express').Router(),
    authorController = require('../controllers/Books/authorController'),
    bookController = require('../controllers/Books/booksController'),
    thoughtController = require('../controllers/Thoughts/thoughtsController'),
    genreController = require('../controllers/genreController'),
    userController = require('../controllers/userController'),
    movieController = require('../controllers/Movies/movieController');

router.get('/health-check', (req, res) =>
    res.send('OK')
);
//Authors
router.route('/authors')
    .get(authorController.list_all_authors);
router.route('/author')   
    .post(authorController.add_author);

//Books
router.route('/books')
    .get(bookController.list_all_books);
router.route('/book')
    .post(bookController.create_a_book);

router.route('/book/:bookId')
    .get(bookController.read_a_book)
    .put(bookController.update_a_book)
    .delete(bookController.delete_a_book);

router.route('/bookFull/:bookId')
    .get(bookController.read_a_book_full)

router.route('/booksByTitle/:title')
    .get(bookController.findBooksByTitle)

router.route('/booksByState/:state/:limit')
    .get(bookController.list_all_byState);
router.route('/booksBestByGenre/:genreName/:limit')
    .get(bookController.list_all_bestbyGenre);
router.route('/booksByAuthor/:authorId')
    .get(bookController.list_all_ByAuthor);
router.route('/booksBest')
    .get(bookController.list_best);

router.route('/bookQuotes/:bookId')
    .post(bookController.create_book_quote);
//Book Genre
router.route('/bookGenres')
    .get(genreController.list_all_book_genres)
router.route('/bookGenre')
    .post(genreController.add_book_genre)

//Book State
router.route('/bookStates')
    .get(bookController.list_all_books_states);

//Thoughts
router.route('/thoughts')
    .get(thoughtController.list_all_thoughts);
router.route('/thought')
    .post(thoughtController.create_a_thought);
router.route('/thought/:thoughtId')
    .get(thoughtController.read_a_thought)
    .put(thoughtController.update_a_thought)
    .delete(thoughtController.delete_a_thought);
router.route('/frontpageThoughts')
    .get(thoughtController.list_frontpage_thoughts)
//User
router.route('/users/signup')
    .post(userController.signup);
router.route('/users/signin')
    .post(userController.signin);
router.route('/users/getUserFromToken')
    .get(userController.getUserFromToken)

//Movies
router.route('/movies')
    .get(movieController.list_all_movies);
router.route('/movie')
    .post(movieController.create_a_movie);

router.route('/movie/:movieId')
    .get(movieController.read_a_movie)
    .put(movieController.update_a_movie)
    .delete(movieController.delete_a_movie);

router.route('/moviesByTitle/:title')
    .get(movieController.findMovieByTitle);

router.route('/moviesRecentlyWatched/:limit')
    .get(movieController.findRecentlyWatched);

router.route('/movies/releaseDates')
    .get(movieController.releaseDates);
    
router.route('/moviesByReleaseDate/:releaseDate')
    .get(movieController.moviesByReleaseDate);

module.exports = router;
