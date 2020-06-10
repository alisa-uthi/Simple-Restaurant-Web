const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')

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
        const tables = await Table.find({ id: req.params.id })
        //const newOrder = new Order({ table: tables[0]._id }) 
        //await newOrder.save()
        const order = await Order.find({ table: tables[0]._id })
        res.render('orderedFood/foodTable', {
            occupiedTables: occupiedTables,
            foods: foods,
            drinks: drinks,
            tables: tables
        })
    }catch{
       res.render('/orderedFood/index', { occupiedTables: occupiedTables })
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
                // let individualFood = Food.findOne({ name : item.name })
                //                                .select('_id')
                //                                .exec()
                //                                .then(docs => {
                //                                     food = {
                //                                         _id: docs._id,
                //                                         name: item.name,
                //                                         price: item.price,
                //                                         foodQuantity: item.quantity,
                //                                         foodTotalPrice: item.totalPrice
                //                                     }
                //                                     foods.push(food)
                //                                })
                food = {
                    name: item.name,
                    price: item.price,
                    foodQuantity: item.quantity,
                    foodTotalPrice: item.totalPrice
                }
                foods.push(food)
            }else if(item.type == 'drink'){
                // let individualDrink = Drink.findOne({ name : item.name })
                //                                .select('_id')
                //                                .exec()
                //                                .then(docs => {
                //                                     drink = {
                //                                         _id: docs._id,
                //                                         name: item.name,
                //                                         price: item.price,
                //                                         drinkQuantity: item.quantity,
                //                                         drinkTotalPrice: item.totalPrice
                //                                     }
                //                                     drinks.push(drink)
                //                                })
                drink = {
                    name: item.name,
                    price: item.price,
                    drinkQuantity: item.quantity,
                    drinkTotalPrice: item.totalPrice
                }
                drinks.push(drink)
            }
        })

        const order = await newOrder.save()
        await order.update({ _id: newOrder._id },{
            $set: {
                food: foods,
                drink: drinks
            }
        })

        // const foundOrder = await Order.findOne({ _id: newOrder._id, table: table[0]._id})
        // console.log(foundOrder) 
    }catch (e){
        console.log(e)
    }
})

module.exports = route
