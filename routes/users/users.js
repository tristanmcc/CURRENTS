const express = require('express');                         // integrates express framework 
const router = express.Router();
const User = require('../../model/user')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('../../model/user');

//Middleware for getting a user

async function getUser(req, res, next) {
    let user 
    try {
        user = await User.findById(req.params.id)
        if (user === null) {
            return res.status(404).json({ message: 'Cannot find user'}) 
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

    res.user = user
    next()
}

//Get one user route
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
});



//Get all users route

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



//Deleting a user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: "User Deleted"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router;

