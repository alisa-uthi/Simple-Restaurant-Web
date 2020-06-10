const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        require: true
    },
    food: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Food' 
    }],
    drink: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Drink' 
    }]
})

module.exports = mongoose.model('Order', orderSchema)