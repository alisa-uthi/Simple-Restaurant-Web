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
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    orderStatus: {
        type: String,
        default: 'Empty'
    }
})

module.exports = mongoose.model('Table', tableSchema)