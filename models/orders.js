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
const Food = mongoose.model('Food', foodSchema)

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
const Drink = mongoose.model('Drink', drinkSchema)

const orderSchema = mongoose.Schema({
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        require: true
    },
    food: [foodSchema],
    drink: [drinkSchema],
    totalQuantity: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    }
})
const Order = mongoose.model('Order', orderSchema)

module.exports = {
    Food: Food,
    Drink: Drink,
    Order: Order
}