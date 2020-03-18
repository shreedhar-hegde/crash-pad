const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    type: String,
    area: String,
    propertyImage: String,
    isInCart: {type: Boolean, default: false}
})

module.exports = mongoose.model('Property', propertySchema)