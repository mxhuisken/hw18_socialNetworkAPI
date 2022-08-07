const { user, thought, reaction } = require('../models')


module.exports = {

    async allReactions(req, res) {
        try {
            const reactions = await reaction.find();
            res.status(200).json(reactions)
        } catch (err) {
            res.status(500).json({ message: 'Error on allThoughts', err })
        }
    },

    async singleReaction(req, res) {
        try {
            const Reaction = await reaction.findOne(
                { id_: req.params.reactionId },
            )
            if (!Reaction) {
                return res.status(404).json('reaction not found')
            }
            res.status(200).json(Reaction)
        } catch (err) {
            res.status(500).json({ message: 'Error on singleReaction', err })
        }
    },
}