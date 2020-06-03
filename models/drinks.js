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
    }
})

module.exports = mongoose.model('Drink', drinkSchema)