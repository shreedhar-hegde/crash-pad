const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Cart = require('../models/cart')
const User = require('../models/user')
const Property = require('../models/property')
const auth = require('../middleware/auth')

router.get('/', auth, (req, res) => {
    console.log('userdata', req.userData)
    Cart.find({
            user: req.userData.userId
        })
        .populate('user')
        .populate('furniture')
        .populate('property')
        .then(cartResponse => {
            console.log('cart response', cartResponse)
            res.status(200).json({
                cart: cartResponse
            })
        })
        .catch(err => {
            console.log('err', err)
            res.status(500).json({
                err: err
            })
        })
})

// router.post('/', (req, res) => {
//     console.log('body', req.body)
//     const newCart = new Cart({
//         user: req.body.userId,
//         furniture: req.body.furnitureId,
//         property: req.body.propertyId,
//         quantity: req.body.quantity
//     })

//     console.log('new cart', newCart)

//     newCart.save()
//         .then(newCart => {
//             console.log(newCart)
//             res.json({
//                 item: newCart
//             })
//         })
//         .catch(err => {
//             console.log('err', err)
//             res.status(500).json({
//                 err: err
//             })
//         })
// })

router.patch('/', (req, res) => {
    console.log('body', req.body)
    Cart.findOne({
            user: req.body.userId
        })
        .then(cart => {
            if (req.body.key === 'furniture') {
                cart.furniture.push(req.body.furnitureId);
                console.log(' furniture cart', cart.furniture)
                cart.save().then(cart => {
                    res.status(200).json({
                        success: true,
                        message: 'Added Furniture to Liked'
                    })
                }).catch(err => {
                    console.log('cart furniture err', err)
                })
            } else {
                cart.property.push(req.body.propertyId)
                cart.save().then(cart => {
                    console.log('cart', cart)
                    res.status(200).json({
                        success: true,
                        message: 'Added Property to Liked'
                    })
                }).catch(err => {
                    console.log('cart property err', err)
                })
            }
        })
})

router.delete('/removefruniture-from-cart/:userId/:furnitureId', (req, res) => {
    console.log('delete item from cart:', req.params)

    Cart.findOne({
        user: req.params.userId
    }).then(cart => {
        console.log('cart', cart)
        let index = cart.furniture.indexOf(req.params.furnitureId)
        cart.furniture.splice(index, 1)
        console.log('cart', cart.furniture)
        cart.save()
    }).then(
        res.status(200).json({
            success: true,
            message: 'Removed Furniture'
        })
    ).catch(err => {
        console.log('delete furniture from cart err', err)
        res.status(500).json({
            success: false
        })
    })
})


router.delete('/removeproperty-from-cart/:userId/:propertyId', (req, res) => {
    console.log('delete item from cart:', req.params)
    Cart.findOne({
        user: req.params.userId
    }).then(cart => {
        console.log('cart property', cart)
        let index = cart.property.indexOf(req.params.propertyId)
        cart.property.splice(index, 1)
        cart.save()
        console.log('cart', cart.property)
    }).then(
        res.status(200).json({
            success: true,
            message: 'Removed Property'
        })
    ).catch(err => {
        console.log('delete property from cart err', err)
        res.status(500).json({
            success: false
        })
    })
})

module.exports = router