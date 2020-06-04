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

    //Still cannot connect with other schema
    var list = req.body.listOfOrder
    try{
        // const table = await Table.find({ id: req.params.id })
        // const newOrder = new Order({
        //     _id: new mongoose.Types.ObjectId(),
        //     table: table._id
        // })
  
        // newOrder.save(err => {
        //     if(err) console.log(err)
        //     list.forEach(item => {
        //         if(item.type == 'food'){
        //             let menu = new Food({
        //                 name: item.name,
        //                 order: newOrder._id
        //             })
        //             menu.save(err => console.log(err + ' -----------'))
        //         }else if(item.type == 'food'){
        //             let menu = new Drink({
        //                 name: item.name,
        //                 order: newOrder._id
        //             })
        //             menu.save(err => console.log(err + ' >>>>>>>>>>>>>'))
        //         }

        //         console.log('quantity = ' + item.quantity)
        //         console.log('price = ' + item.totalPrice)
        //         Order.findByIdAndUpdate({ _id: newOrder._id }, {
        //                 orderQuantity: item.quantity,
        //                 orderTotalPrice: item.totalPrice
        //             })
        //     })
        // })

        // const getOrder = await Order.find()
        //                             .populate({ path: 'Food', select: 'name' })
        //                             .populate({ path: 'Drink', select: 'name' })
        //                             .exec()
        //     console.log(getOrder)

        // const food = new Food({
        //                 name: list[0].name,
        //                 price: list[0].price,
        //                 orderQuantity: list[0].quantity,
        //                 orderTotalPrice: list[0].totalPrice
        //                 //order: newOrder1._id
        //             })
        //     newOrder1.food = food._id
        //     await newOrder1.save()
        //     const found = await Order.findOne({ totalPrice: 600 }).populate('Food').exec()
        //     console.log(found.food + ' -----')

        ///////////////////////////////////////////////////////// DELETE
        // Order.deleteMany({ orderQuantity: 0 }, (err, result) => console.log(result))
        // const found = await Order.find()
        // console.log(found)
        /////////////////////////////////////////////////////////

        // await newOrder1.save((err) => {
        //     if(err) throw err
            // list.forEach(item => {
                //if(item.type == 'food'){
                    // const food = new Food({
                    //     name: list[0].name,
                    //     price: list[0].price,
                    //     orderQuantity: list[0].quantity,
                    //     orderTotalPrice: list[0].totalPrice,
                    //     order: newOrder1._id
                    // })
                    // food.save()
                //}
                // }else if(item.type == 'drink'){
                //     drink = new Drink({
                //         name: item.name,
                //         price: item.price,
                //         orderQuantity: item.quantity,
                //         orderTotalPrice: item.totalPrice,
                //         order: newOrder1._id
                //     })
                //     drink.save()
                // }
           // })
        // })

        // await Order.
        //     find().
        //     populate('Food').
        //     exec(function (err, order) {
        //         if (err) return handleError(err);
        //         console.log('food for this order '+ order.food);
        //     });


        //     list.forEach(item => {
        //     if(item.type == 'food'){
        //         food = {
        //             name: item.name,
        //             price: item.price,
        //             orderQuantity: item.quantity,
        //             orderTotalPrice: item.totalPrice
        //         }
        //         newOrder1.updateOne({ table: table._id }, { $push: { food: food } } ).then(() => console.log(newOrder1))
        //     }else if(item.type == 'drink'){
        //         drink = {
        //             name: item.name,
        //             price: item.price,
        //             orderQuantity: item.quantity,
        //             orderTotalPrice: item.totalPrice
        //         }
        //         newOrder1.updateOne({ table: table._id }, { $push: { drink: drink } } )
        //     }
        // })

    }catch (e){
        console.log(e)
    }
})

module.exports = route
