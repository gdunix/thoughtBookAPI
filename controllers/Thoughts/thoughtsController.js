import Thought from '../../models/Thoughts/thoughtModel';
import logger from '../../utils/logger';
import messages from '../../utils/constants';

export const list_all_thoughts = (req, res) => {
  Thought.find({})
  .select('_id name text')
  .sort({ order: -1 })
  .exec((err, thoughts) => {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.generalError);
    }

    res.json(thoughts);
  });
};

export const list_frontpage_thoughts = (req, res) => {
  Thought.find({ frontpage: true }, (err, thoughts) => {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.generalError);
    }

    res.json(thoughts);
  });
}

export const create_a_thought = (req, res) => {
  const new_thought = new Thought(req.body);
  new_thought.save((err, thought) => {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.generalError);
    }
    res.json(thought);
  });
};

export const read_a_thought = (req, res) => {
  Thought.findById(req.params.thoughtId, (err, thought) => {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.generalError);
    }
    res.json(thought);
  });
};


export const update_a_thought = (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId }, 
    req.body, 
    { new: true }, (err, thought) => {
      if (err) {
        logger.log('error', err);
        return res.status(500).send(messages.generalError);
      }
    res.json(thought);
  });
};


export const delete_a_thought = (req, res) => {
  Thought.remove({
    _id: req.params.thoughtId
  }, (err, thought) => {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.generalError);
    }
    res.json(req.params.thoughtId);
  });
};



