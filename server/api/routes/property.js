const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Property = require('../models/property')

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
    const newProperty = new Property({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        area: req.body.area,
        propertyImage: req.body.propertyImage
    })
    newProperty.save()
        .then(property => {
            res.status(201).json({
                message: 'Property Stored',
                property: property
            })
        })
        .catch(err => res.status(500).json(err))
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

router.put('/', (req, res) => {
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

router.delete('/:propertyId', (req, res) => {

    Property.remove(req.params.propertyId)
        .then(result => {
            res.status(200).json({
                message: 'Property deleted'
            })
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router