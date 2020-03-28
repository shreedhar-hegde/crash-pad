const mongoose = require('mongoose')

const furnitureSchema = mongoose.Schema({
    name: String,
    price: Number,
    imageUrl: String,
})

module.exports = mongoose.model('Furniture', furnitureSchema)