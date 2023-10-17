const { User, Thought } = require('../models');

const getAllThoughts = async (req, res) => {
  try {
    const allThoughts = await Thought.find({})
      .populate('reactions');

    !allThoughts
      ? res.status(400).json({ message: 'Sorry. All thoughts could not be found' })
      : res.status(200).json(allThoughts)
  } catch (err) {
    res.status(500).json(err)
  }
}
const getOneThought = async (req, res) => {
  try {
    const oneThought = await Thought.findOne({ _id: req.params.thoughtId })
      .populate('reactions');

    !oneThought
      ? res.status(400).json({ message: 'Sorry. No thought with that id could found' })
      : res.status(200).json(oneThought)
  } catch (err) {
    res.status(500).json(err)
  }
}
const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body)
    const updateUserWithThought = await User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: newThought._id } },
      { new: true }
    )
      .populate('thoughts')
      .populate('friends')

    !updateUserWithThought
      ? res.status(400).json({ message: 'Sorry. User update filed' })
      : res.status(200).json(updateUserWithThought)
  } catch (err) {
    res.status(500).json(err)
  }
}
const updateThought = async (req, res) => {
  try {
    const updateThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .populate('reactions')
    !updateThought
      ? res.status(404).json({ message: 'Sorry. No thought with that id found' })
      : res.status(200).json(updateThought)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteThought = async (req, res) => {
  try {
    const deleteThought = await Thought.findByIdAndDelete(req.params.thoughtId)

    !deleteThought
      ? res.status(404).json({ message: 'Sorry. No thought with that id found' })
      : res.status(200).json(`Thought with the id of ${req.params.thoughtId} has been deleted`)
  } catch (err) {
    res.status(500).json(err)
  }
}

const newReaction = async (req, res) => {
  try {
    const newReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
    !newReaction
      ? res.status(400).json({ message: 'New reaction unable to be created' })
      : res.status(200).json(newReaction)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteReaction = async (req, res) => {
  try {
    const deleteReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } },
      { new: true, runValidators: true }
    )
    !deleteReaction
      ? res.status(404).json({ message: 'No reaction with that Id found' })
      : res.status(200).json(`reaction with the id of ${req.params.reactionId}`)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = { getAllThoughts, getOneThought, createThought, updateThought, deleteThought, newReaction, deleteReaction }