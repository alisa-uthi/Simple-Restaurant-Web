const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
var methodOverride = require('method-override')
const expressLayout = require('express-ejs-layouts')

const bookTableRouter = require('./routes/bookTable')
const orderedFoodRouter = require('./routes/orderedFood')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}));
dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
                 useNewUrlParser: true,
                 useUnifiedTopology: true,
                 useFindAndModify: false })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/book-table', bookTableRouter)
app.use('/ordered-food', orderedFoodRouter)

// db.dropCollection('Order', (err, result) => {
//     console.log('result = ' + result)
// })

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is starting')
})
