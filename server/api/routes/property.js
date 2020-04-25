const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Property = require('../models/property')
const Cart = require('../models/cart')

router.get('/', (req, res) => {
    Property.find()
        .then(properties => {
            res.status(200).json({
                properties: properties
            })
        })
        .catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {

    console.log('property post', req.body)

    const newProperty = new Property({
        name: req.body.name,
        costPerMonth: req.body.costPerMonth,
        type: req.body.type,
        area: req.body.area,
        numberOfRooms: req.body.noOfRooms,
        propertyImage: req.body.propertyImage
    })
    newProperty.save()
        .then(property => {
            res.status(201).json({
                message: 'Property Stored',
                property: property
            })
        })
        .catch(err => {
            console.log('add property err', err)
            res.status(500).json(err)
        } )
})


router.get('/:propertyId', (req, res) => {
    Property.findById(req.params.propertyId).populate('property')
        .then(order => {
            if (!order) {
                return res.status(500).json({
                    message: 'Property Not Found'
                })
            }

            res.status(200).json({
                property: property
            })
        })
        .catch(err => res.status(500).json(err))
})

router.patch('/addtocart', (req, res) => {
    console.log('update property', req.body)

    Property.updateOne({
        _id: req.body.propertyId
    }, {
       $set: { isInCart: req.body.isInCart}
    }).then(updatedProperty => {
        console.log('updated cart', updatedProperty)
        res.status(200).json({
            'message': 'Added to Liked', success: true
        })
    }).catch(err => {
        res.status(500).json({err: err})
        console.log('add to cart err', err)
    })
})

router.patch('/', (req, res) => {
    console.log('update property req', req.body)

    req.body.map(property => {
        Property.updateOne({_id: property._id}, property, {new: true})
        .then(updateproperty => {
            res.json({success: true})
        }).catch(err => {
            console.log('err', err)
        })
    })
})

router.delete('/:propertyId', (req, res) => {

    console.log('delete property', req.params.propertyId)
    Cart.deleteOne({property: req.params.propertyId})
    .then(cart => {
        Property.deleteOne({_id: req.params.propertyId})
        .then(deletedProperty => {
            res.status(200).json({message: 'Property deleted'})
        })
    }).catch(err => {
        console.log('cart delete err', err)
    })

    // Property.remove(req.params.propertyId)
    //     .then(result => {
    //         res.status(200).json({
    //             message: 'Property deleted'
    //         })
    //     })
    //     .catch(err => res.status(500).json(err))
})

module.exports = router