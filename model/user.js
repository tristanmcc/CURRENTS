const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({

    username: {
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
        default: -200
        
    },
    currentBalance: {
        type: Number,
        default: 0
        
    },
    totalSpent: {
        type: Number,
        default: 0
        
    },
    totalEarned: {
        type: Number,
        default: 0
        
    }, 
    participation: {
        type: Number,
        default: 0
        
    }
    
}, {timestamps: true} );                //takes time of action

module.exports = mongoose.model('User', userSchema); 