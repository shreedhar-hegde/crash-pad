const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./config')



mongoose.connect( keys.mongoAtlasUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Mongo connected')
})

const furnitureRoutes = require('./api/routes/furniture')
const propertyRoutes = require('./api/routes/property')
const userRoutes = require('./api/routes/user')
const cartRoutes = require('./api/routes/cart')
const rentRoutes = require('./api/routes/rent')

app.use('/uploads', express.static('uploads'))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, DELETE, POST, GET')
        return res.status(200).json({})
    }

    next()

})



app.use('/property', propertyRoutes)
app.use('/furniture', furnitureRoutes)
app.use('/user', userRoutes)
app.use('/cart', cartRoutes)
app.use('/rent', rentRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})


app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app