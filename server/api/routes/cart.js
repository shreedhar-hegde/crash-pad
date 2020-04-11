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
            console.log(' furniture cart', cart.furniture)
            cart.save().then(cart => {
                res.status(200).json({success: true, message: 'Added to Liked'})
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
                    res.status(200).json({success: true, message: 'Added to Liked'})
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
            console.log(' furniture property', cart.property)
                cart.save().then(cart => {
                    res.status(200).json({success: true, message: 'Added to Liked'})
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
                        res.status(200).json({success: true, message: 'Added to Liked'})
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


router.delete('/deletefurniture/:furnitureid/:cartid', (req, res) => {
            console.log('delete item from cart:', req.params.cartid)

            Cart.findById({_id: req.params.cartid}).then(cart => {
             let index =  cart.furniture.indexOf(req.params.cartid)
             cart.furniture.splice(index, 1)
             cart.save()
            }).then(
                res.status(200).json({success: true, message: 'Removed'})
            ).catch(err => {
                console.log('delete furniture from cart err', err)
                res.status(500).json({success: false})
            })
        })

        router.delete('/deleteproperty/:propertyid/:cartid', (req, res) => {
            console.log('delete item from cart:', req.params.propertyid)
            Cart.findById({_id: req.params.cartid}).then(cart => {
                let index =  cart.property.indexOf(req.params.propertyid)
                cart.property.splice(index, 1)
                cart.save()
                console.log('cart', cart.property)
               }).then(
                   res.status(200).json({success: true, message: 'Removed'})
               ).catch(err => {
                   console.log('delete property from cart err', err)
                   res.status(500).json({success: false})
               })
        })

        module.exports = router