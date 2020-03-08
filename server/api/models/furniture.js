const mongoose = require('mongoose')

const furnitureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
})

module.exports = mongoose.model('Furniture', furnitureSchema)