const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
    type: String,
    area: String
})

module.exports = mongoose.model('Property', propertySchema)