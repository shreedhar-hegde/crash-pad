const express = require('express')
const router = express.Router()
const multer = require('multer')
const auth = require('../middleware/auth')

const keys = require('../../config')

const stripe = require('stripe')(`${keys.stripeKey}`);

const mongoose = require('mongoose')


router.post('/', (req, res) => {
    console.log('rent', req.body)

    stripe.customers
  .create({
    email: req.body.email,
  })
  .then((customer) => {
      console.log('customer', customer)
    return stripe.invoiceItems.create({
    customer: customer.id,
    amount: req.body.amount * 100,
    currency: 'inr',
    description: 'One-time setup fee',
  })
  .then((invoiceItem) => {
      return stripe.invoices.create({
         
          customer: invoiceItem.customer,
        });
    })
    .then((invoice) => {
        console.log('invoice', invoice)
        res.status(200).json({success:true})
    // New invoice created on a new customer
  })
  .catch((err) => {
    console.log('stripe err', err)
  });
})

})


module.exports = router