const express = require('express')
const route = express.Router()

const Table = require('../models/tables')
const { Order } = require('../models/orders')

route.get('/:id', async (req, res) => {
    const table_id = req.params.id
    try{
        const table = await Table.findOne({ id: table_id })
        const orderTable = await Order.findOne({ table: table._id })
        res.render('checkBill/index', {
            id: table_id,
            orderTable: orderTable
        })
    }catch{
        console.log('Fail on check bill')
    }
})

route.delete('/:id/clear-bill', async (req, res) => {
    const table_id = req.params.id
    try{
        const table = await Table.findOne({ id: table_id })
        const orderTable = await Order.findOne({ table: table._id })
        await orderTable.remove()
        // res.send("You have paid successfully. Thank you.")
    }catch{
        console.log('Fail on remove bill')
    }
})

module.exports = route