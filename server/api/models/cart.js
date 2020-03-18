const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    furniture: [{
        type: Schema.Types.ObjectId,
        ref: 'Furniture',
    }],
    property: [{
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }],
    qunantity: Number,
    createdOn: {
        type: Date,
        default: Date.now
    }
})

module.exports =  mongoose.model('Cart', cartSchema)