const express = require('express')
const router = express.Router()

const keys = require('../../config')

const stripe = require('stripe')(`${keys.stripeKey}`);

const mongoose = require('mongoose')

const SoldItem = require('../models/soldItems')


router.get('/', (req, res) => {
  SoldItem.find()
    .populate('user')
    .populate('furniture')
    .populate('property')
    .then(soldItems => {
    res.status(200).json({soldItems: soldItems})
  })
  .catch(err => {
    console.log('sold items get err', err)
  })
})

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
        console.log('invoice', invoice, req.body.key)
        if(req.body.key === 'furniture') {
          SoldItem.findOne({user: req.body.user._id})
      .then(soldItem => {
          if(soldItem) {
              soldItem.furniture.push(req.body.item._id);
              console.log(' sold item furniture', soldItem.furniture)
              soldItem.save().then(soldItem => {
                  res.status(200).json({success: true, soldItem: soldItem})
              }).catch(err => {
                  console.log('sold item furniture err', err)
              })
          } else {
              let newSoldItem = new SoldItem({
                  user: req.body.user._id
              })
              newSoldItem.save()
              .then(soldItem => {
                  soldItem.furniture.push(req.body.item._id);
                  soldItem.save().then(soldItem => {
                      res.status(200).json({success: true, soldItem: soldItem})
                  }).catch(err => {
                      console.log('new soldItem  save err', err)
                  })
              }).catch(err => {
                  console.log('sold item err', err)
              })
          }
      })
      } else {
          SoldItem.findOne({user: req.body.userId})
          .then(soldItem => {
              if(soldItem) {
                  soldItem.property.push(req.body.item._id)
                  soldItem.save().then(soldItem => {
                      res.status(200).json({success: true, soldItem: soldItem})
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
                          res.status(200).json({success: true, soldItem: soldItem})
                      }).catch(err => {
                          console.log('sold item property err')
                      })
                  }).catch(err => {
                      console.log('new sold item property err')
                  })
              }
          })
      }

        // res.status(200).json({success:true})
    // New invoice created on a new customer
  })
  .catch((err) => {
    console.log('stripe err', err)
  });
})

})


module.exports = router