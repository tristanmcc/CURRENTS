const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    creditLimit: {
        type: Number,
        required: true
    },
    currentBalance: {
        type: Number,
        required: true
    },
    totalSpent: {
        type: Number,
        required: true
    },
    totalEarned: {
        type: Number,
        required: true
    }, 
    participation: {
        type: Number,
        required: true
    }
    
})

module.exports = mongoose.model('User', userSchema);