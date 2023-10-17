const { User, Thought } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find({})
      .populate('thoughts')
      .populate('friends')
    !getAllUsers
      ? res.status(400).json({ message: 'Could not get all user data' })
      : res.status(200).json(getAllUsers)

  } catch (err) {
    res.status(500).json(err)
  }
}

const getOneUser = async (req, res) => {
  try {
    const getSingleUser = await User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends');

    !getSingleUser
      ? res.status(404).json({ message: 'Sorry. That user was not found' })
      : res.status(200).json(getSingleUser)
  } catch (err) {
    res.status(500).json(err)
  }
}

const createUser = async (req, res) => {
  try {
    const createUser = await User.create(
      { username: req.body.username, email: req.body.email }
    );
    !createUser
      ? res.status(400).json({ message: 'Sorry. User was not created' })
      : res.status(200).json(createUser)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateUser = async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .populate('thoughts')
      .populate('friends')

    !updateUser
      ? res.status(404).json({ message: 'User with that id not found' })
      : res.status(200).json(updateUser)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ _id: req.params.userId });
    //delete thoughts created by the user that was deleted
    const deleteThoughts = await Thought.deleteMany({ _id: req.params.userId })

    !deleteUser
      ? res.status(404).json({ message: 'Sorry. No user with this id found' })
      : res.status(200).json({ message: 'User was deleted' })
  } catch (err) {
    res.status(500).json(err)
  }
}

const addFriend = async (req, res) => {
  try {
    const addFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      //adding the new friend id to the array of friends
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .populate('friends')
      .populate('thoughts')

    const otherFriendAdd = await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $push: { friends: req.params.userId } },
      { new: true }
    )
      .populate('friends')
      .populate('thoughts')

    const allAdded = { addFriend, otherFriendAdd }

    !addFriend
      ? res.status(404).json({ message: 'No User or Friend with those ids found' })
      : res.status(200).json(allAdded)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteFriend = async (req, res) => {
  try {
    const deleteFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      //removing the friend with the matching id from the friends array
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .populate('thoughts')
      .populate('friends')

    const deleteOtherFriend = await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { friends: req.params.userId } },
      { new: true }
    )
      .populate('thoughts')
      .populate('friends')

    const bothDeleted = { deleteFriend, deleteOtherFriend }

    !deleteFriend
      ? res.status(404).json({ message: 'No user or friend with those ids found' })
      : res.status(200).json(bothDeleted)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = { getAllUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, deleteFriend }