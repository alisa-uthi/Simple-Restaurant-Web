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
    drink: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drink'
    },
    orderQuantity: {
        type: Number,
        default: 0
    },
    orderTotalPrice: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Order', orderSchema)