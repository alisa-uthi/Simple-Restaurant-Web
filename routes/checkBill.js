const express = require('express')
const route = express.Router()

const Table = require('../models/tables')
const { Order } = require('../models/orders')

route.get('/:id', async (req, res) => {
    const table_id = req.params.id
    try{
        const table = await Table.findOne({ id: table_id })
        const orderTable = await Order.findOne({ table: table._id })
        if(orderTable != null && orderTable != ''){
            res.render('checkBill/index', {
                id: table_id,
                orderTable: orderTable
            })
        }else{
            res.status(200).send('This order is not found')
        }
        
    }catch{
        console.log('Fail on check bill')
    }
})

route.delete('/:id/clear-bill', async (req, res) => {
    const table_id = req.params.id
    try{
        const table = await Table.findOne({ id: table_id })
        const orderTable = await Order.findOne({ table: table._id })
        if(orderTable != null && orderTable != ''){
            await orderTable.remove()
            await Table.updateOne({ id: table_id }, {
                $set:{ status: 'Available' }
            })
            return res.json({message: 'This order has been removed successfully'})
        }
            
        else{
            res.json({
                message: 'The order is not found'
            })
        }    
    }catch{
        console.log('Fail on remove bill')
    }
})

module.exports = route