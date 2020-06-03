const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        require: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    },
    foodQuantity: {
        type: Number,
        default: 0
    },
    drink: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drink'
    },
    drinkQuantity: {
        type: Number,
        default: 0
    },
    totalQuantity: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Order', orderSchema)