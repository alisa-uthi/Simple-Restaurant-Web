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
    orderQuantity: {
        type: Number,
        default: 0
    },
    orderTotalPrice: {
        type: Number,
        default: 0
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }
})

module.exports = mongoose.model('Food', foodSchema)