require('../../models/Thoughts/thoughtModel');
var mongoose = require('mongoose'),
Thought = mongoose.model('Thought');

exports.list_all_thoughts = function(req, res) {
    Thought.find({}, function(err, thought) {
    if (err) {
        res.send(err);
    }
        
    res.json(thought);
    });
};

exports.list_frontpage_thoughts = function(req, res) {
  Thought.find({frontpage: true}, function(err, thoughts) {
    if (err) {
        res.send(err);
    }
        
    res.json(thoughts);
    });
}

exports.create_a_thought = function(req, res) {
    var new_thought= new Thought(req.body);
    new_thought.save(function(err, thought) {
      if (err)
        res.send(err);
      res.json(thought);
    });
  };
  
  
exports.read_a_thought = function(req, res) {
  Thought.findById(req.params.thoughtId, function(err, thought) {
    if (err)
      res.send(err);
    res.json(thought);
  });
};


exports.update_a_thought = function(req, res) {
  Thought.findOneAndUpdate({_id: req.params.thoughtId}, req.body, {new: true}, function(err, thought) {
    if (err)
      res.send(err);
    res.json(thought);
  });
};


exports.delete_a_thought = function(req, res) {
  Thought.remove({
    _id: req.params.thoughtId
  }, function(err, thought) {
    if (err)
      res.send(err);
    res.json(req.params.thoughtId);
  });
};



