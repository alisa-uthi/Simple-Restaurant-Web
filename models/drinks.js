const mongoose = require('mongoose')

const drinkSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    drinkQuantity: {
        type: Number,
        default: 0
    },
    drinkTotalPrice: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Drink', drinkSchema)