const express = require('express');                         // integrates express framework 
const router = express.Router();
const User = require('../model/user')

//Get all users route

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Get one user route
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

//Creating one user route

router.post('/', async (req, res) => {
    const user = new User({
    name: req.body.name,
    alias: req.body.alias ,
    password: req.body.password,
    creditLimit: req.body.creditLimit,
    currentBalance: req.body.currentBalance,
    totalSpent: req.body.totalSpent,
    totalEarned: req.body.totalEarned,
    participation: req.body.participation

})

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})


//Updating a user

//Deleting a user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: "User Deleted"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//middleware for getting a user

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
module.exports = router