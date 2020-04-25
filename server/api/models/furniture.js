const mongoose = require('mongoose')

const furnitureSchema = mongoose.Schema({
    name: String,
    price: Number,
    imageUrl: String,
    isSold: {type: Boolean, default: false},
    invoiceNumber: String,
    monthsRented: Number,
    deliveryAddress: String,
})

module.exports = mongoose.model('Furniture', furnitureSchema)