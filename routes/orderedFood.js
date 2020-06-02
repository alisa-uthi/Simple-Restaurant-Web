const express = require('express')
const route = express.Router()
const Table = require('../models/tables')
const Food = require('../models/foods')
const Drink = require('../models/drinks')
const Order = require('../models/orders')

// Ordered food route
route.get('/', async (req, res) => {
    try{
        const occupiedTables = await Table.find({ status: 'Occupied' })
        res.render('orderedFood/index', { occupiedTables: occupiedTables })
    }catch{
        res.redirect('/')
    }
})

// When customers in the table order food or drink
route.post('/:id', async (req, res) => {
    try{
        const foods = await Food.find({}).populate('Order').exec()
        const drinks = await Drink.find({})
        const table = await Table.findOne({ id: req.params.id })
        const order = await new Order({
            table: table.id
        })
        res.render('orderedFood/index', {
            foods: foods,
            drinks: drinks,
            tables: table,
            orders: order
        })
    }catch{
        res.render('/bookTable/index')
    }
})

module.exports = route
