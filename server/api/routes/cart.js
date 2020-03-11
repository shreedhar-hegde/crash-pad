const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Cart = require('../models/cart')
const User = require('../models/user')
const Property = require('../models/property')

router.get('/', (req, res) => {
    console.log('cart', req.body)
    Cart.find({user: req.body.userId})
        .populate('furniture')
        .populate('property')
        .then(cartResponse => {
            res.status(200).json({cart: cartResponse})
        })
        .catch(err => {
            res.status(500).json({err: err})
        })
})

router.post('/', (req, res) => {
    console.log(req.body)
    const newCart = new Cart({
        user: req.body.userId,
        furniture: req.body.furnitureId,
        property: req.body.propertyId,
        quantity: req.body.quantity
    }) 

    console.log(newCart)

    newCart.save()
        .then(newCart => {
            console.log(newCart)
            res.json({item: newCart})
        })
        .catch(err => {
            console.log('err', err)
            res.status(500).json({err: err})
        })
})

module.exports = router