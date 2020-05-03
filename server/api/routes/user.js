const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

let app = express()

app.use(express.static('uploads'))

const Cart = require('../models/cart')
const Order =  require('../models/order')

const crypto = require('crypto')
var path = require('path')
const multer = require('multer')
var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, file.originalname)
    })
  }
})

var upload = multer({ storage: storage })

router.get('/', (req, res) => {
    User.find()
    .then(users => {
        users.map(user => {
            user.photoid = `http://localhost:5000/uploads/${user.photoid}`
        })
        res.status(200).json({users: users})
    })
})

router.post('/signup', (req, res, next) => {
    console.log('signup', req.body)
    if(validator.isEmail(req.body.email)) {
        User.find({
            email: req.body.email
        })
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'Mail id taken'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) res.status(500).json(err)
                    else {
                        const user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            address: req.body.address,
                            contact: req.body.contact,
                            password: hash
                        })
                        user.save()
                            .then(user => {

                                let cart = new Cart({
                                    user: user._id
                                })

                                cart.save()

                                let newOrder = new Order({
                                    user: user._id
                                })

                                newOrder.save()

                                console.log('new user',user)
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => res.status(500).json(err))
                    }
                })
            }
        })
    } else {
        res.status(500).json({message:'Invalid Email'})
    }
    
})

router.post('/login', (req, res, next) => {
    console.log('req',req.body.email)
    User.findOne({email: req.body.email})
    .then(user => {
        console.log('login user',user)
        if(user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            })
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) {
                    res.status(401).json({
                        message: 'Auth failed'
                    })
                } 
                if(result) {
                    console.log('result', user, user)
                   const token =  jwt.sign({
                        email: user.email,
                        userId: user._id
                    }, "jwtkey")
                    res.status(200).json({
                        message: 'Auth Success',
                        user: user,
                        jwt: token
                    })
                } else {
                    res.status(500).json({
                        message: 'Auth Failed'
                    })
                }
            })
        }
    })
    .catch(err => res.status(500).json(err))
})

router.delete(':/userId', (req, res) => {
    User.remove({_id: req.params.userId})
    .then(result => {
        res.status(200).json({message: 'User deleted'})
    })
    .catch(err => res.status(500).json(err))
})

router.get('/auth', auth, (req, res) => {
    res.status(200).json({message:true})
})

router.get('/verify', (req, res) => {

    console.log('verify', req.body)

    User.find()
    .select('name email address phone isVerified')
    .then(users => {
        console.log('users', users)
        res.status(200).json({users: users})
    }).catch(err => {
        console.log('verify err', err)
    })
})

router.put('/verify', async (req, res) => {


    console.log('verify',req.body)

    await req.body.map(newUser => {
       User.updateOne({_id: newUser._id}, newUser, {upsert: true}) 
       .then(updatedUser => {
           console.log('verified user', updatedUser)
       })
    })
    res.status(200).json({message: 'User updated', success:true})
    
})

router.patch('/updateprofile', upload.single('photoid'), (req, res) => {
    console.log('update profile', req.file, req.body)

    User.updateOne({_id: req.body._id}, {
        $set: {
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            address: req.body.address,
            photoid: req.file.filename
        }
    }).then(updatedUser => {
        User.find({_id: req.body._id}).then(user => {
            res.status(200).json({message: 'Profile updated', user: user})
        })
      
    }).catch(err => {
        console.log('update user error', err)
        res.status(500).json({sucess: false})
    })
})


module.exports = router