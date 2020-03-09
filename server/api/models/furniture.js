const mongoose = require('mongoose')

const furnitureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    imageUrl: String
})

module.exports = mongoose.model('Furniture', furnitureSchema)