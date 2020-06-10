const express = require('express')
const route = express.Router()

const Table = require('../models/tables')
const { Food } = require('../models/orders')
const { Drink } = require('../models/orders')
const { Order } = require('../models/orders')

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
        let occupiedTables = await Table.find({ status: 'Occupied' })
        const foods = await Food.find({})
        const drinks = await Drink.find({})
        const tables = await Table.find({ id: req.params.id })
        res.render('orderedFood/foodTable', {
            occupiedTables: occupiedTables,
            foods: foods,
            drinks: drinks,
            tables: tables
        })
    }catch{
        res.send('failed')
    }
})

route.post('/:id/order', async (req, res) => {
    var list = req.body.listOfOrder
    try{
        const table = await Table.find({ id: req.params.id })
        const newOrder = new Order({
            table: table[0]._id
        })
        
        var foods = []
        var drinks = []
        list.forEach(item => {
            if(item.type == 'food'){
                food = {
                    name: item.name,
                    price: item.price,
                    foodQuantity: item.quantity,
                    foodTotalPrice: item.totalPrice
                }
                foods.push(food)
            }else if(item.type == 'drink'){
                drink = {
                    name: item.name,
                    price: item.price,
                    drinkQuantity: item.quantity,
                    drinkTotalPrice: item.totalPrice
                }
                drinks.push(drink)
            }
        })

        await newOrder.save()
        await Order.update({ _id: newOrder._id },{
            $set: {
                food: foods,
                drink: drinks
            },
            upsert: true
        })
    }catch (e){
        console.log(e)
    }
})

module.exports = route
