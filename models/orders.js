const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table'
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    },
    foodQuantity: {
        type: Number,
    },
    drink: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drink'
    },
    drinkQuantity: {
        type: Number,
    }
})

module.exports = mongoose.model('Order', orderSchema)