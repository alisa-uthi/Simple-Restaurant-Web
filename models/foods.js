const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
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
    foodQuantity: {
        type: Number,
        default: 0
    },
    foodTotalPrice: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Food', foodSchema)