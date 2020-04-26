const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
    name: {type: String, required: true},
    costPerMonth: {type: Number, required: true},
    type: String,
    area: String,
    propertyImage: String,
    numberOfRooms: Number,
    monthsRented: Number,
    invoiceNumber: String,
    isSold: { type:Boolean, default: false },
    contact: String,
    address: String
})

module.exports = mongoose.model('Property', propertySchema)