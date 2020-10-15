const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },

    alias: {
        type: String,
        required: [true, 'Please enter an alias'],
        unqiue : true
    },

    password: {
        type: String,
        minlength: [3, 'Password is too short'],                                               ////// make this longer!!!!
        required: [true, 'Please enter a password']
    }, 

    email: {
        type: String,
        required: true,
        unique: [true, 'Please enter an email'],
        // match: /.{1,}@[^.]{1,}/,
        validate: [isEmail, 'Please enter a valid email']
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
        
    }, 
    spendingCapacity: {
        type: Number,
        default: 200
    }
    
    
}, {timestamps: true} );                //takes time of action




//fire a function before doc saved to db to encrypt password

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

//static method to log in user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user
        }
        throw Error('Incorrect password')
    }
    throw Error('incorrect email')
}

//static method to find user by alias for transaction
userSchema.statics.transact = async function(alias, amount, res) {
    const beneficiery = await this.findOne({ alias });
    if (beneficiery) {
        
        // const updatedUser = res.beneficiery.save()
        return beneficiery
        
    }
    throw Error('alias does not exist')
}


module.exports = mongoose.model('User', userSchema); 