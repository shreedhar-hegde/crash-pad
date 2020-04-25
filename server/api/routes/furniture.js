const express = require('express')
const router = express.Router()
const multer = require('multer')
const auth = require('../middleware/auth')

const mongoose = require('mongoose')

const Furniture = require('../models/furniture')
const Cart = require('../models/cart')


router.get('/', (req, res) => {
    console.log('get furntiure')
    Furniture.find()
        .then(furnitures => {
            console.log('furnitures', furnitures)
            if (furnitures.length > 0) {
                res.status(200).json({
                    message: 'Get furnitures',
                    furnitures: furnitures
                })
            } else {
                res.status(404).json({
                    message: 'No entries found'
                })
            }

        })
        .catch(err => {
            res.status(500).json({
                err: err
            })
        })

})


// upload.single('furnitureImage')
router.post('/', (req, res) => {

    console.log('auth furniture', req.body, req.userData)    

    const newFurniture = new Furniture({
        name: req.body.name,
        price: req.body.price,
        imageUrl: req.body.imageUrl
    })

    newFurniture.save().then(furniture => {
        console.log('furniture', furniture)
        res.status(200).json({
            message: 'Post furnitures',
            createdfurniture: {
                name: furniture.name,
                price: furniture.price,
                imageUrl: furniture.imageUrl
            }
        })
    }).catch(err => {
        console.log('err', err)
        res.status(500).json({
            err: err
        })
    })


})

//update


// router.get('/:furnitureId', (req, res) => {
//     Furniture.findById(req.params.furnitureId)
//         .then(furniture => {
//             console.log('furniture', furniture)
//             if (furniture) {
//                 res.status(200).json({
//                     furniture: furniture
//                 })
//             } else res.status(400).json({
//                 message: 'No valid entry found'
//             })
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 err: err
//             })
//         })
// })


router.delete('/:furnitureId', (req, res) => {

    Cart.deleteOne({furniture: req.params.furnitureId})
    .then(cart => {
        Furniture.deleteOne({_id: req.params.furnitureId})
        .then(deletedFurniture => {
            res.status(200).json({message: 'Furniture deleted'})
        })
    }).catch(err => {
        console.log('cart delete err', err)
    })

})

router.patch('/', (req, res) => {
    console.log('update funtiture req', req.body)

    req.body.map(furniture => {
        Furniture.updateOne({_id: furniture._id}, furniture, {new: true})
        .then(updateFurniture => {
            res.json({success: true})
        }).catch(err => {
            console.log('err', err)
        })
    })
})

router.patch('/addtocart', (req, res) => {
    console.log('update furniture', req.body)

    Furniture.updateOne({
        _id: req.body.furnitureId
    }, {
       $set: { isInCart: req.body.isInCart}
    }).then(updatedCart => {
        console.log('updated cart', updatedCart)
        res.status(200).json({
            'message': 'Added to Cart', success: true
        })
    }).catch(err => {
        res.status(500).json({err: err})
        console.log('add to cart err', err)
    })
})

module.exports = router