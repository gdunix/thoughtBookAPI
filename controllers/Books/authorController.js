import logger from '../../utils/logger';
import messages from '../../utils/constants';
import Author from '../../models/Books/authorModel';

export const add_author = (req, res) => {
    const new_author = new Author(req.body);
    Author.find({ "name": new_author.name })
        .exec((err, author) => {
            if (err) {
                logger.log('error', err);
                return res.status(500).send(messages.getBooksError);
            }
            if (author.length > 0) {
                return res.status(409).send(messages.duplicateEntry);
            }
            new_author.save((err, author) => {
                if (err) {
                    logger.log('error', err);
                    return res.status(500).send(messages.getBooksError);
                }

                res.json(author);
            });
        });
};

export const update_an_author = (req, res) => {
    Author.findOneAndUpdate({ _id: req.params.authorId }, req.body, { new: true })
      .exec((err, author) => {
        if (err) {
          logger.log('error', err);
          return res.status(500).send(messages.getBooksError);
        }
  
        res.json(author);
      });
  };

export const list_all_authors = (req, res) => {
    Author.find({}, (err, author) => {
        if (err) {
            logger.log('error', err);
            return res.status(500).send(messages.getBooksError);
        }

        res.json(author);
    });
};
