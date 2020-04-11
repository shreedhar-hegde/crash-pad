const mongoose = require('mongoose')

const furnitureSchema = mongoose.Schema({
    name: String,
    price: Number,
    imageUrl: String,
    isSold: {type: Boolean, default: false}
})

module.exports = mongoose.model('Furniture', furnitureSchema)