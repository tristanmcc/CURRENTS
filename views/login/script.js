const express = require('express');                         // integrates express framework 
const router = express.Router();
const User = require('../model/user')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')



  
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt) 
        const user = new User({
        Name: req.body.Name,
        alias: req.body.alias ,
        password: hashedPassword,
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



module.exports = router