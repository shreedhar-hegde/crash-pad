const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
    name: {type: String, required: true},
    costPerMonth: {type: Number, required: true},
    type: String,
    area: String,
    propertyImage: String,
    numberOfRooms: Number,
    isInCart: {type: Boolean, default: false}
})

module.exports = mongoose.model('Property', propertySchema)