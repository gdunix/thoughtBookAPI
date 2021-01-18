import express from 'express';

import * as authorController from '../controllers/Authors';
import * as bookController from '../controllers/Books';
import * as thoughtController from '../controllers/Thoughts';
import * as genreController from '../controllers/Genres';
import * as userController from '../controllers/Users';
import * as moviesController from '../controllers/Movies';
import * as quotesController from '../controllers/Quotes';
import { auth } from '../middlewares';

const router = express.Router();

router.get('/health-check', (req, res) =>
    res.send('OK')
);
//Authors
router.route('/authors')
    .get(authorController.list_all_authors);
router.route('/author')
    .post([auth, authorController.add_author]);
router.route('/author/:authorId')
    .put([auth, authorController.update_an_author]);

//Books
router.route('/books')
    .get(bookController.list_all_books);
router.route('/book')
    .post([auth, bookController.create_a_book]);

router.route('/book/:bookId')
    .get(bookController.read_a_book)
    .put([auth, bookController.update_a_book])
    .delete([auth, bookController.delete_a_book]);

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
    .post([auth, bookController.create_book_quote]);
//Book Genre
router.route('/bookGenres')
    .get(genreController.list_all_book_genres)
router.route('/bookGenre')
    .post(genreController.add_book_genre)

//Book State
router.route('/bookStates')
    .get(bookController.list_all_books_states);

//Book Lists
router.route('/bookLists')
    .get(bookController.list_all_bookLists);

router.route('/booksByList/:listId')
    .get(bookController.list_by_listId)

//Thoughts
router.route('/thoughts')
    .get(thoughtController.list_all_thoughts);
router.route('/thought')
    .post([auth, thoughtController.create_a_thought]);
router.route('/thought/:thoughtId')
    .get(thoughtController.read_a_thought)
    .put([auth, thoughtController.update_a_thought])
    .delete([auth, thoughtController.delete_a_thought]);
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
    .get(moviesController.list_all_movies);
router.route('/movie')
    .post([auth, moviesController.create_a_movie]);

router.route('/movie/:movieId')
    .get(moviesController.read_a_movie)
    .put([auth, moviesController.update_a_movie])
    .delete([auth, moviesController.delete_a_movie]);

router.route('/moviesByTitle/:title')
    .get(moviesController.findMovieByTitle);

router.route('/moviesRecentlyWatched/:limit')
    .get(moviesController.findRecentlyWatched);

router.route('/movieReleaseDates')
    .get(moviesController.releaseDates);

router.route('/moviesByReleaseDate/:releaseDate')
    .get(moviesController.moviesByReleaseDate);

router.route('/moviesLatestSeen/:page/:size')
    .get(moviesController.get_movies_with_paging);

router.route('/getMoviesWithQuotes')
    .get(moviesController.getMoviesWithQuotes);

router.route('/movie/:movieId/addQuote')
    .post([auth, moviesController.addMovieQuote]);

router.route('/movie/:movieId/updateQuotes')
    .put(moviesController.updateMovieQuotes);

router.route('/movie/:movieId/changeImage')
    .put([auth, moviesController.updateMovieImage]);

router.route('/quotes')
    .get(moviesController.getQuotes);

router.route('/quotes/:quoteId')
    .put([auth, quotesController.update_quote]);

router.route('/quotesByMovie/:movieId')
    .get(moviesController.getMovieQuotes);

router.route('/deleteQuote/:quoteId')
    .delete([auth, moviesController.deleteMovieQuote]);

router.route('/moviesBest/:limit')
    .get(moviesController.moviesBest);

router.route('/moviesBestOf/:from/:to')
    .get(moviesController.bestof);

router.route('/findMoviesByDirector/:director')
    .get(moviesController.findMoviesByDirector);

router.route('/getDirectors')
    .get(moviesController.getDirectors);

router.route('/getDirectorsCount')
    .get(moviesController.getDirectorsCount);

export default router;
