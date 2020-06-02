const mongoose = require('mongoose')

const tableSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    seat: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: 'Available'
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    },
    drink: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drink'
    }
})

module.exports = mongoose.model('Table', tableSchema)