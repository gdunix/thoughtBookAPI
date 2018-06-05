import Thought from '../../models/Thoughts/thoughtModel';

export const list_all_thoughts = (req, res) => {
  Thought.find({}, function (err, thought) {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.generalError);
    }

    res.json(thought);
  });
};

export const list_frontpage_thoughts = (req, res) => {
  Thought.find({ frontpage: true }, function (err, thoughts) {
    if (err) {
      logger.log('error', err);
      return res.status(500).send(messages.generalError);
    }

    res.json(thoughts);
  });
}

export const create_a_thought = (req, res) => {
  var new_thought = new Thought(req.body);
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
  console.log(req.params.thoughtId)
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



