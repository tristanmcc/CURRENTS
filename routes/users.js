const express = require('express');                         // integrates express framework 
const router = express.Router();
const User = require('../model/user')
const bcrypt = require('bcrypt')
var bodyParser = require('body-parser');




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

//Creating one user route (Encrypted Password)

router.post('/', async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt()
        // const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = new User({
        Name: req.body.Name,
        alias: req.body.alias ,
        password: req.body.password,
        creditLimit: req.body.creditLimit,
        currentBalance: req.body.currentBalance,
        totalSpent: req.body.totalSpent,
        totalEarned: req.body.totalEarned,
        participation: req.body.participation
    })

    const newUser = await user.save()
    res.status(201).json(newUser)
     

    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})


//Updating a user
router.patch('/:id', getUser, async  (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.alias != null) {
        res.user.alias = req.body.alias
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    if (req.body.creditLimit != null) {
        res.user.creditLimit = req.body.creditLimit
    }
    if (req.body.currentBalance != null) {
        res.user.currentBalance = req.body.currentBalance
    }
    if (req.body.totalSpent != null) {
        res.user.totalSpent = req.body.totalSpent
    }
    if (req.body.totalEarned != null) {
        res.user.totalEarned = req.body.totalEarned
    }
    if (req.body.participation != null) {
        res.user.participation = req.body.participation
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
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


//Logging in a user

router.post('/users/login', async (req, res) => {
    const user = User.find(user => user.name = req.body.name)
    if (user === null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }

}) 



module.exports = router