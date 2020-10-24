const mongoose = require('mongoose');



const transactionSchema = new mongoose.Schema({
    
    transaction_number: {
        type: Number,
        
    },
    
    payer: {
        type: String
    },

    receiver:{
        type: String
    },
    
    payment_amount: {
        type: Number
    },

    note: {
        type: String
    },

    date: {
        type: Date
    
    }

}, {timestamps: true});



transactionSchema.statics.get_transactions = async function(payer, receiver, res) {
    const transaction = await this.find({ payer, receiver });
    if (payer || receiver) {
        
        // const updatedUser = res.beneficiery.save()
        return transaction
        
    }
    throw Error('error')
}


module.exports = mongoose.model('Transaction', transactionSchema); 