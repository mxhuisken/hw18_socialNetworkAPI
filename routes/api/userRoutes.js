const router = require('express').Router();
const { user } = require("../../models")

// Controller
const {
    allUsers,
    createUser,
    singleUser,
    updateUser,
    delUser,
    addFriend,
    delFriend
} = require('../../controllers/userController');

// /api/users
// GET ALL USERS, CREATE USER
router.route('/')
    .get(allUsers)
    .post(createUser);

// /api/users/:id
// GET SINGLE USER, DEL USER, UPD USER
router.route('/:id')
    .get(singleUser)
    .delete(delUser)
    .put(updateUser)

// /api/users/:id/friend/:friendId
// ADD FRIEND, DEL FRIEND
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(delFriend);

module.exports = router;