const express = require('express')
const route = express.Router()
const Table = require('../models/tables')
const Food = require('../models/foods')
const Drink = require('../models/drinks')
const Order = require('../models/orders')

//Ordered food route
route.get('/', async (req, res) => {
    try{
        const occupiedTables = await Table.find({ status: 'Occupied' })
        res.render('orderedFood/index', { occupiedTables: occupiedTables })
    }catch{
        res.redirect('/')
    }
})

route.get('/:id', async (req, res) => {
    try{
        const occupiedTables = await Table.find({ status: 'Occupied' })
        const foods = await Food.find({})
        const drinks = await Drink.find({})
        const tables = await Table.find({ id: req.params.id }).populate('Order').exec()
        //const newOrder = new Order({ table: tables[0]._id }) 
        //await newOrder.save()
        const order = await Order.find({ table: tables[0]._id })
        res.render('orderedFood/foodTable', {
            occupiedTables: occupiedTables,
            foods: foods,
            drinks: drinks,
            tables: tables
        })
    }catch(e){
        console.log(e)
        console.log('fail woiiiii')
       // res.render('/orderedFood/index', { occupiedTables: occupiedTables })
    }
})

route.post('/:id/order', async (req, res) => {
    try{
        const table = await Table.find({ id: req.params.id })
        const orderOfTable = new Order({
            table: table
        })
    }catch{
        console.log('fail to update order')
    }
})

module.exports = route
