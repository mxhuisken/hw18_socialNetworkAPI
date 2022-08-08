const { user, thought, reaction } = require('../models')

module.exports = {

    async allThoughts(req, res) {
        try {
            const thoughts = await thought.find();
            res.status(200).json(thoughts)
        } catch (err) {
            res.status(500).json({ message: 'Error on allThoughts', err })
        }
    },

    async createThought(req, res) {
        try {
            const newThought = await thought.create(req.body)
            await user.findOneAndUpdate(
                { username: newThought.username },
                { $push: { thoughts: newThought._id } }
            )
            res.status(200).json(newThought)
        } catch (err) {
            res.status(500).json({ message: 'Error on createThought', err })
        }
    },

    async singleThought(req, res) {
        try {
            const Thought = await thought.findOne(
                { _id: req.params.thoughtId }
            )
            if (!Thought) {
                return res.status(404).json('Thought not found')
            }
            res.status(200).json(Thought)
        } catch (err) {
            res.status(500).json({ message: 'Error on singleThought', err })
        }
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
            )
            if (!updatedThought) {
                return res.status(404).json('Thought not found')
            }
            res.status(200).json(updatedThought)
        } catch (err) {
            res.status(500).json({ message: 'Error on updateThought', err })
        }
    },

    async delThought(req, res) {
        try {
            const deleteThought = await thought.findOneAndDelete(
                { _id: req.params.thoughtId }
            )
            if (!deleteThought) {
                return res.status(404).json('Thought not found')
            }
            res.status(200).json(deleteThought)
        } catch (err) {
            res.status(500).json({ message: 'Error on delThought', err })
        }
    },

    async addReaction(req, res) {
        try {
            const newReaction = await thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true },
            )
            if (!newReaction) {
                return res.status(404).json('Thought not found')
            }
            res.status(200).json(newReaction)
        } catch (err) {
            res.status(500).json({ message: 'Error on addReaction', err })
        }
    },

    async singleReaction(req, res) {
        try {
            const Reaction = await reaction.findOne(
                { _id: req.params.reactionId },
            )
            if (!Reaction) {
                return res.status(404).json('Reaction not found')
            }
            res.status(200).json(Reaction)
        } catch (err) {
            res.status(500).json({ message: 'Error on singleReaction', err })
        }
    },

    async delReaction(req, res) {
        try {
            const deleteReaction = await thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { new: true }
            )
            if (!deleteReaction) {
                return res.status(404).json('Reaction not found')
            }
            res.status(200).json('Reaction Deleted')
        } catch (err) {
            res.status(500).json({ message: 'Error on delReaction', err })
        }
    },

}