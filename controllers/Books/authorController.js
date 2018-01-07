import logger from '../../utils/logger';
import messages from '../../utils/constants';
import Author from '../../models/Books/authorModel';
    
export function add_author(req, res) {  
    var new_author= new Author(req.body);
    Author.find({"name" : new_author.name})
    .exec((err, author) => {
        if(err) {
            logger.log('error', err);
            return res.status(500).send(messages.getBooksError);  
        }
        if(author.length > 0){
            return res.status(409).send(messages.duplicateEntry);  
        }
        new_author.save(function(err, author) {
            if (err){
                logger.log('error', err);
                return res.status(500).send(messages.getBooksError);  
            }           
            res.json(author);
        });
    });    
};
    
export function list_all_authors(req, res) {
    Author.find({}, function(err, author) {
        if (err){
            logger.log('error', err);
            return res.status(500).send(messages.getBooksError);  
        }
            
        res.json(author);
    });
};
