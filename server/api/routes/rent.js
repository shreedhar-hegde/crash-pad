const express = require('express')
const router = express.Router()

const keys = require('../../config')

const stripe = require('stripe')(`${keys.stripeKey}`);

const Furniture = require('../models/furniture')
const Property = require('../models/property')
const Cart = require('../models/cart')
const Order = require('../models/order')


router.get('/:id', (req, res) => {
    console.log('get history', req.params)
    Order.find({user: req.params.id})
        .populate('user')
        .populate('furniture')
        .populate('property')
        .then(orders => {
            console.log('sold item', orders)
            res.status(200).json({
                orders: orders
            })
        })
        .catch(err => {
            console.log('sold items get err', err)
        })
})

router.post('/', async (req, res) => {
    console.log('rent', req.body)

    let email = req.body.email
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
                                    Order.findOne({
                                        user: req.body.user._id
                                    })
                                    .then(order => {
                                            order.furniture.push(req.body.item._id);
                                            console.log('sold item furniture', order.furniture)
                                            order.save()
                                                .then(order => {
                                                    res.status(200).json({
                                                        success: true,
                                                       message:  `Successfully rented the property. Please check email ${email} for invoice. You will be navigated to History.`

                                                    })
                                                })
                                                .catch(err => {
                                                    console.log('sold item furniture err', err)
                                                })
                                    })
                                    .catch(err => {
                                        console.log('sold item err', err)
                                    })
                                )
                            })
                    } else {
                        console.log('in else, property')
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
                                console.log('cart', cart)
                                let index =  cart.property.indexOf(req.body.item._id)
                                cart.property.splice(index, 1)
                                cart.save()

                               }).then(
                                    Order.findOne({
                                        user: req.body.user._id
                                    })
                                    .then(order => {
                                            order.property.push(req.body.item._id)
                                            order.save().then(order => {
                                                console.log('sold item', order)
                                                res.status(200).json({
                                                    success: true,
                                                    message: `Successfully rented the property. Please check email ${email} for invoice. You will be navigated to History.`
                                                })
                                            }).catch(err => {
                                                console.log('sold item property err')
                                            })
                                    })
                                )
                        })
                    }
                })
            }).catch((err) => {
                    console.log('stripe err', err)
                })
        })
})
module.exports = router