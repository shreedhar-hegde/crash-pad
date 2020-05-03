const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = mongoose.Schema({
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
    createdOn: {
        type: Date,
        default: Date.now
    }
})

module.exports =  mongoose.model('Order', orderSchema)