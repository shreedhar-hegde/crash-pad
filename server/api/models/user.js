const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    isVerfied: {type: String, default: false},
    address: {type: String},
    phone: {type: String}
})

module.exports = mongoose.model('User', userSchema)