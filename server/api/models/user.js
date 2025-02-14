const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    isVerified: {type: Boolean, default: false},
    address: {type: String, default: null},
    contact: {type: String, default: null},
    photoid: {type:String}
})

module.exports = mongoose.model('User', userSchema)