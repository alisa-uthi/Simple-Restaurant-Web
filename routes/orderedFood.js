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
        let parameter = {
            occupiedTables: occupiedTables,
            foods: foods,
            drinks: drinks,
            tables: tables
        }
        res.status(200).render('orderedFood/foodTable', parameter)
    }catch{
        res.send('failed')
    }
})

route.post('/:id/order', async (req, res) => {
    var list = req.body.listOfOrder
    try{
        const table = await Table.find({ id: req.params.id })
        await Table.updateOne({ id: req.params.id}, {
            $set: { orderStatus: 'Ordered'}
        })
        const newOrder = new Order({
            table: table[0]._id, 
            totalPrice: req.body.totalPrice,
            totalQuantity: req.body.totalQuantity
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
        await Order.updateOne({ _id: newOrder._id },{
            $set: {
                food: foods,
                drink: drinks
            },
            upsert: true
        })
        
        res.status(200).json({message: "ok ja"})
    }catch (e){
        console.log(e)
    }
})

route.get('/modify/:id', async (req, res) => {
    const table_id = req.params.id
    var includeFood = []
    var includeDrink = []
    try{
        const table = await Table.findOne({ id: table_id })
        const orderTable = await Order.findOne({ table: table._id })
        if(orderTable.food.length > 0){
            orderTable.food.forEach(item => {
                includeFood.push(item.name)
            })
        }
        if(orderTable.drink.length > 0){
            orderTable.drink.forEach(item => {
                includeDrink.push(item.name)
            })
        }
        const foodExcludeFromOrder = await Food.find({ name: {$nin: includeFood} })
        const drinkExcludeFromOrder = await Drink.find({ name: {$nin: includeDrink} })

        if(orderTable != null && orderTable != ''){
            res.render('orderedFood/modifyOrder', {
                id: table_id,
                orderTable: orderTable,
                food: foodExcludeFromOrder,
                drink: drinkExcludeFromOrder
            })
        }
    }catch{
        res.send('Fail to get the modify order page')
    }
})

route.patch('/modify/:id', async (req, res) => {
    var list = req.body.listOfOrder
    console.log(list)
    try{
        const table = await Table.find({ id: req.params.id }) 
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
        await Order.updateOne({ table: table[0]._id },{
            $set: {
                food: foods,
                drink: drinks,
                totalPrice: req.body.totalPrice,
                totalQuantity: req.body.totalQuantity
            },
            upsert: true
        })
        res.status(200).json({message: "ok ja"})
    }catch (e){
        console.log(e)
    }
})

module.exports = route
