import Thought from '../../models/Thoughts/thoughtModel';

export function list_all_thoughts(req, res) {
    Thought.find({}, function(err, thought) {
    if (err) {
        res.send(err);
    }
        
    res.json(thought);
    });
};

export function list_frontpage_thoughts(req, res) {
  Thought.find({frontpage: true}, function(err, thoughts) {
    if (err) {
        res.send(err);
    }
        
    res.json(thoughts);
    });
}

export function create_a_thought(req, res) {
    var new_thought= new Thought(req.body);
    new_thought.save(function(err, thought) {
      if (err)
        res.send(err);
      res.json(thought);
    });
  };
  
  
export function read_a_thought(req, res) {
  Thought.findById(req.params.thoughtId, function(err, thought) {
    if (err)
      res.send(err);
    res.json(thought);
  });
};


export function update_a_thought(req, res) {
  Thought.findOneAndUpdate({_id: req.params.thoughtId}, req.body, {new: true}, function(err, thought) {
    if (err)
      res.send(err);
    res.json(thought);
  });
};


export function delete_a_thought(req, res) {
  Thought.remove({
    _id: req.params.thoughtId
  }, function(err, thought) {
    if (err)
      res.send(err);
    res.json(req.params.thoughtId);
  });
};



