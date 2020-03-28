const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Cart = require('../models/cart')
const User = require('../models/user')
const Property = require('../models/property')
const auth = require('../middleware/auth')

router.get('/', auth, (req, res) => {
    console.log(req.userData)
    Cart.find({
            user: req.userData.userId
        })
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

router.post('/', (req, res) => {
    console.log('body', req.body)
    const newCart = new Cart({
        user: req.body.userId,
        furniture: req.body.furnitureId,
        property: req.body.propertyId,
        quantity: req.body.quantity
    })

    console.log('new cart', newCart)

    newCart.save()
        .then(newCart => {
            console.log(newCart)
            res.json({
                item: newCart
            })
        })
        .catch(err => {
            console.log('err', err)
            res.status(500).json({
                err: err
            })
        })
})

router.patch('/', (req, res) => {
    console.log('body', req.body)
    if(req.body.key === 'furniture') {
        Cart.findOne({user: req.body.userId})
    .then(cart => {
        if(cart) {
            cart.furniture.push(req.body.furnitureId);
            cart.save().then(cart => {
                res.status(200).json({success: true})
            }).catch(err => {
                console.log('cart furniture err', err)
            })
        } else {
            let newCart = new Cart({
                user: req.body.userId
            })
            newCart.save()
            .then(cart => {
                cart.furniture.push(req.body.furnitureId);
                cart.save().then(cart => {
                    res.status(200).json({success: true})
                }).catch(err => {
                    console.log('new cart  save err', err)
                })
            }).catch(err => {
                console.log('furniture err', err)
            })
        }
    })
    } else {
        Cart.findOne({user: req.body.userId})
        .then(cart => {
            if(cart) {
                cart.property.push(req.body.propertyId)
                cart.save().then(cart => {
                    console.log('property cart', cart)
                }).catch(err => {
                    console.log('property err')
                })
            } else {
                let newCart = new Cart({
                    property: req.body.propertyId,
                    user: req.body.userId
                })
                newCart.save()
                .then(cart => {
                    cart.property.push(req.body.propertyId)
                    cart.save().then(cart => {
                        res.status(200).json({success: true})
                    }).catch(err => {
                        console.log('property err')
                    })
                }).catch(err => {
                    console.log('new property err')
                })
            }
        })
    }

    

    

})


router.delete('/deletefurniture/:id', (req, res) => {
            console.log('delete item from cart:', req.params.id)
            Cart.findOneAndDelete({
                furniture: req.params.id
            }).then(result => {
                console.log('result', result)
                res.status(200).json({
                    message: 'deleted successfully',
                    success: true
                })
            }).catch(err => {
                console.log('remove item err', err)
                res.status(500).json({
                    err: err
                })
            })
        })

        router.delete('/deleteproperty/:id', (req, res) => {
            console.log('delete item from cart:', req.params.id)
            Cart.findOneAndDelete({
                property: req.params.id
            }).then(result => {
                console.log('result', result)
                res.status(200).json({
                    message: 'deleted successfully',
                    success: true
                })
            }).catch(err => {
                console.log('remove item err', err)
                res.status(500).json({
                    err: err
                })
            })
        })

        module.exports = router