const mongoose = require('mongoose')

const furnitureSchema = mongoose.Schema({
    name: String,
    price: Number,
    imageUrl: String,
    isInCart: {type: Boolean, default: false}
})

module.exports = mongoose.model('Furniture', furnitureSchema)