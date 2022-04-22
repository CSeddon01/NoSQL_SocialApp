const { User } = require('../models');

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
            path: "friends",
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
    //delete the user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
    addFriend({  params }, res) {
        User.findOneAndUpdate({ _id: params.userid }),
        { $push: { friends: params.friendsId }},
        { new: true, runValidators: true}
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
    deleteFriend({ params }, res) {
        User.findOneAndDelete({ _id: params.userid }),
        { $pull: { friends: params.friendsId }},
        { new: true, runValidators: true}
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    }
};

module.exports = userController;