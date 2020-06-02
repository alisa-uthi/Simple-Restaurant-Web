const mongoose = require('mongoose')

const drinkSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Drink', drinkSchema)