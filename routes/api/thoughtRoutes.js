const router = require('express').Router();
const { thought, reaction } = require('../../models')

// Controller
const {
    allThoughts,
    createThought,
    singleThought,
    updateThought,
    delThought,
    addReaction,
    delReaction,
    singleReaction,
} = require('../../controllers/thoughtController');


// /api/thoughts
// GET ALL THOUGHTS, CREATE THOUGHT
router.route('/')
    .get(allThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
// GET SINGLE THOUGHT, DEL THOUGHT, UPD THOUGHT
router.route('/:thoughtId')
    .get(singleThought)
    .delete(delThought)
    .put(updateThought)
    .put()

// /api/thoughts/:thoughtId/reactions
// ADD REACTION
router.route('/:thoughtId/reactions')
    .post(addReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
// GET SINGLE REACTION, DEL REACTION
router.route('/:thoughtId/reactions/:reactionId')
    .get(singleReaction)
    .delete(delReaction)

module.exports = router;