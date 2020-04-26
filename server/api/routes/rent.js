const express = require('express')
const router = express.Router()

const keys = require('../../config')

const stripe = require('stripe')(`${keys.stripeKey}`);

const Furniture = require('../models/furniture')
const Property = require('../models/property')
const Cart = require('../models/cart')
const SoldItem = require('../models/soldItems')


router.get('/:id', (req, res) => {
    console.log('get history', req.params)
    SoldItem.find({user: req.params.id})
        .populate('user')
        .populate('furniture')
        .populate('property')
        .then(soldItems => {
            console.log('sold item', soldItems[0].furniture)
            res.status(200).json({
                soldItems: soldItems
            })
        })
        .catch(err => {
            console.log('sold items get err', err)
        })
})

router.post('/', async (req, res) => {
    console.log('rent', req.body)

    // stripe.invoices.listLineItems('in_1GbnFlLlkBcr8A7evgq0qZTv', (err, lines) => {
    //     console.log('lines', lines)
    // })


    // stripe.invoices.list((err, invoices) => {
    //     console.log('invoices',invoices)
    // })

    stripe.customers
        .create({
            email: req.body.email,
        })
        .then((customer) => {
            return stripe.invoiceItems.create({
                    customer: customer.id,
                    amount: req.body.amount * 100,
                    currency: 'inr',
                })
                .then((invoiceItem) => {
                    return stripe.invoices.create({
                        customer: invoiceItem.customer,
                        collection_method: 'send_invoice',
                        days_until_due: 3
                    });
                })
                .then(async(invoice) => {

                    stripe.invoices.sendInvoice(invoice.id, (err, invoice) => {
                        
                    
                    if (req.body.key === 'furniture') {
                        Furniture.updateOne({
                                _id: req.body.item._id
                            }, {
                                $set: {
                                    monthsRented: req.body.monthsRented,
                                    invoiceNumber: invoice.number,
                                    isSold: true,
                                    deliveryAddress: req.body.address
                                }
                            })
                            .then(updatedItem => {

                                console.log('updated item',  updatedItem)
                                Cart.findById({
                                    _id: req.body.cartid
                                }).then(cart => {
                                    let index = cart.furniture.indexOf(req.body.item._id)
                                    cart.furniture.splice(index, 1)
                                    cart.save()
                                    console.log('cart', cart.furniture)
                                }).then(
                                    SoldItem.findOne({
                                        user: req.body.user._id
                                    })
                                    .then(soldItem => {
                                        if (soldItem) {
                                            soldItem.furniture.push(req.body.item._id);
                                            console.log(' sold item furniture', soldItem.furniture)
                                            soldItem.save()
                                                .then(soldItem => {
                                                    res.status(200).json({
                                                        success: true,
                                                        soldItem: soldItem
                                                    })
                                                })
                                                .catch(err => {
                                                    console.log('sold item furniture err', err)
                                                })
                                        } else {
                                            let newSoldItem = new SoldItem({
                                                user: req.body.user._id
                                            })
                                            newSoldItem.save()
                                                .then(soldItem => {
                                                    soldItem.furniture.push(req.body.item._id);
                                                    soldItem.save()
                                                        .then(soldItem => {
                                                            res.status(200).json({
                                                                success: true,
                                                                soldItem: soldItem
                                                            })
                                                        })
                                                        .catch(err => {
                                                            console.log('new soldItem  save err', err)
                                                        })
                                                })
                                                .catch(err => {
                                                    console.log(' new sold item err', err)
                                                })
                                        }
                                    })
                                    .catch(err => {
                                        console.log('sold item err', err)
                                    })
                                )
                            })
                    } else {
                        Property.updateOne({
                            _id: req.body.item._id
                        }, {
                            $set: {
                                monthsRented: req.body.monthsRented,
                                invoiceNumber: invoice.number,
                                isSold: true,
                                address: req.body.address
                            }
                        }).then(updatedItem => {
                            Cart.findById({_id: req.body.cartid}).then(cart => {
                                let index =  cart.property.indexOf(req.body.item._id)
                                cart.property.splice(index, 1)
                                cart.save()
                                console.log('cart', cart.property)

                               }).then(
                                    SoldItem.findOne({
                                        user: req.body.userId
                                    })
                                    .then(soldItem => {
                                        if (soldItem) {
                                            soldItem.property.push(req.body.item._id)
                                            soldItem.save().then(soldItem => {
                                                res.status(200).json({
                                                    success: true,
                                                    soldItem: soldItem
                                                })
                                            }).catch(err => {
                                                console.log('sold item property err')
                                            })
                                        } else {

                                            let newSoldItem = new SoldItem({
                                                property: req.body.item._id,
                                                user: req.body.user._id
                                            })
                                            newSoldItem.save()
                                                .then(soldItem => {
                                                    soldItem.property.push(req.body.propertyId)
                                                    soldItem.save().then(soldItem => {
                                                        res.status(200).json({
                                                            success: true,
                                                            soldItem: soldItem
                                                        })
                                                    }).catch(err => {
                                                        console.log('sold item property err')
                                                    })
                                                }).catch(err => {
                                                    console.log('new sold item property err')
                                                })
                                        }
                                    })
                                )
                        })
                    }
                })
            })
                .catch((err) => {
                    console.log('stripe err', err)
                })
        })
})
module.exports = router