const express = require('express')
const route = express.Router()

const Table = require('../models/tables')
const { Order } = require('../models/orders')

// Get bill of a particular table route
route.get('/:id', async (req, res) => {
    const table_id = req.params.id
    try{
        const table = await Table.findOne({ id: table_id })
        const orderTable = await Order.findOne({ table: table._id })

        // If this table has ordered menus
        if(orderTable != null && orderTable != ''){
            res.render('checkBill/index', {
                id: table_id,
                orderTable: orderTable
            })
        }else{
            res.status(404).send('This order is not found')
        }
        
    }catch{
        res.status(500).json({ message: "Cannot find this order" })
    }
})

// Clear bill route
route.delete('/:id/clear-bill', async (req, res) => {
    const table_id = req.params.id
    try{
        const table = await Table.findOne({ id: table_id })
        const orderTable = await Order.findOne({ table: table._id })

        // If this table has ordered menus
        if(orderTable != null && orderTable != ''){
            // Remove this order and Change status of the table
            await orderTable.remove()
            await Table.updateOne({ id: table_id }, {
                $set:{ status: 'Available',
                       orderStatus: 'Empty' }
            })
            return res.status(200).json({ 
                message: 'This order has been paid successfully. Thank you.' 
            })
        }
        else{
            res.status(404).json({
                message: 'The order is not found'
            })
        }    
    }catch{
        res.status(500).json({ message: "Cannot find this order" })
    }
})

module.exports = route