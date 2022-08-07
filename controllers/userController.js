const { user, thought, reaction } = require('../models')

module.exports = {

    async allUsers(req, res) {
        try {
            const users = await user.find()
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' })
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: 'Error on allUsers', err });
        }
    },

    async createUser(req, res) {
        try {
            const newUser = await user.create(req.body)
            res.status(200).json(newUser)
        } catch (err) {
            res.status(500).json({ message: 'Error on newUser', err })
        }
    },

    async singleUser(req, res) {
        try {
            const User = await user.findOne(
                { _id: req.params.id }
            )
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' })
            if (!User) {
                return res.status(404).json({ message: 'User does not exist' })
            }
            res.status(200).json(User)
        } catch (err) {
            res.status(500).json({ message: 'Error on singleUser', err })
        }
    },

    async updateUser(req, res) {
        try {
            const updatedUser = await user.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            )
            if (!updatedUser) {
                return res.status(404).json(`Can't find User`)
            }
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(500).json({ message: 'Error on updateUser', err })
        }
    },

    delUser(req, res) {
        user.findOneAndDelete({ _id: req.params.id })
            .then((User) =>
                !User
                    ? res.status(404).json({ message: 'No usfser with that ID' })
                    : thought.deleteMany({ _id: { $in: User.thoughts } })
            )
            .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    async addFriend(req, res) {
        try {
            // FIND USER
            const updatedUser = await user.findByIdAndUpdate(
                { _id: req.params.id },
                { $push: { friends: req.params.friendId } },
            )
            if (!updatedUser) {
                return res.status(404).json(`Can't find User`)
            }
            // FIND FRIEND
            const updatedFriend = await user.findByIdAndUpdate(
                { _id: req.params.friendId },
                { $push: { friends: req.params.id } },
            )
            if (!updatedFriend) {
                return res.status(404).json(`Can't find Friend`)
            }
            res.status(200).json('Friend Added')
        } catch (err) {
            res.status(500).json({ message: 'Error on addFriend', err })
        }
    },

    // DELETE USER FRIEND
    async delFriend(req, res) {
        try {
            // FIND USER
            const updatedUser = await user.findByIdAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
            )
            if (!updatedUser) {
                return res.status(404).json(`Can't find User`)
            }
            // FIND FRIEND
            const updatedFriend = await user.findByIdAndUpdate(
                req.params.friendId,
                { $pull: { friends: req.params.id } },
            )
            // GETS BSON ERROR IF STRING USED IN ID
            // NEED TO DEBUG LATER
            if (!updatedFriend || !updatedUser) {
                return res.status(404).json(`Can't find Friend`)
            }
            res.status(200).json('Friend Deleted')
        } catch (err) {
            res.status(500).json({ message: 'Error ond delFriend', err })
        }
    },
}