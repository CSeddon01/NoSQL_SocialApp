const { User, Thoughts } = require('../models');

const thoughtsContoller = {
    // // get all thoughts 
    getAllThoughts(req, res) {
        Thoughts.find({})
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
    //get one thought by _id
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400).json({ message: 'No thought found with this id!' });
          });
    },
// add new thought
createThoughts({ params, body}, res) {
    Thoughts.create(body)
    .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No users found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },
  //update a thought
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.id }, body,
      { new: true, runValidators: true })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },
  //delete a thoughts
  deleteThoughts({ params }, res) {
      Thoughts.findOneAndDelete({ _id: params.id})
      .then(deleteThoughts => {
          if (!deleteThoughts) {
            res.status(404).json({ message: "No thought found with this id!"});
            return;
          }
          res.json(deleteThoughts);
  })
  .catch(err => res.json(err));
}
}

module.exports = thoughtsContoller;
