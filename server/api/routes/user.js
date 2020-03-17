const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

router.get('/', (req, res) => {
    User.find()
    .then(users => {
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
                            phone: req.body.phone,
                            password: hash
                        })
                        user.save()
                            .then(user => {
                                console.log(user)
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
        console.log(user)
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
                   const token =  jwt.sign({
                        email: user.email,
                        userId: user._id
                    }, "jwtkey", {expiresIn: "24h"})
                    res.status(200).json({
                        message: 'Auth Success',
                        user: user,
                        token: token
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
    User.find()
    .select('name email address phone isVerified')
    .then(users => {
        console.log('users', users)
        res.status(200).json({users: users})
    }).catch(err => {
        console.log('verify err', err)
    })
})

router.put('/verify', (req, res) => {
    console.log('verify: ', req.body)
})


module.exports = router