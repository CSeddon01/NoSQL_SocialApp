const res = require('express/lib/response');
const { User, Thoughts } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    }, 
    // get one user by _id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({ 
            path: "thoughts",
        })
        .populate({
            path: "friend",
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
    //update the user   
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    }, 
    //delete the user and thoughts from that user
    deleteUser({ params }, res) {
        Thoughts.deleteMany({ userId: params.id })
        .then(() => {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
        })
    },

    addFriend({  params }, res) {
        User.findOneAndUpdate({ _id: params.userId },
        { $push: { friend: params.friendId }},
        { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },

    deleteFriend({ params }, res) {
         User.findOneAndUpdate({ _id: params.userId },
        { $pull: { friend: params.friendId }},
        { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },
};

module.exports = userController;