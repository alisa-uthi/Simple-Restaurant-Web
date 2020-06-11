const express = require('express')
const route = express.Router()
const Table = require('../models/tables')

// Show all tables in this restautant
route.get('/', async (req, res) => {
    try{
        getAllTable(res)
    }catch{
        res.redirect('/bookTable/index')
    }
})

// Change table status route
route.put('/change-table-status', async (req, res) => {
    // Get number of this table. It will be in form of "book-table1"
    let table_id = req.body.table_id
    table_id = table_id.split('table')[1]
    try{
        // Change status of this table
        let table = await Table.findOne({ id: table_id })
        if(table.status == 'Available'){
            table = await Table.findOneAndUpdate({ id: table_id }, 
                                                 { status: 'Occupied' },
                                                 { new: true })
        }else if(table.status == 'Occupied'){
            table = await Table.findOneAndUpdate({ id: table_id }, 
                                                 { status: 'Available' },
                                                 { new: true })
        }

        getAllTable(res)

        res.status(200).json({ message: "Successfully change the status of this table" })
    }catch{
        res.status(500).json({ message: 'Fail to update the status' })
    }
})

async function getAllTable(res){
    const allTable = await Table.find({})
    res.render('bookTable/index', { tables: allTable })
}

module.exports = route