const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
    
})

module.exports = mongoose.model('Food', foodSchema)