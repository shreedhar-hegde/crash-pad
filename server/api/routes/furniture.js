const express = require('express')
const router = express.Router()
const multer = require('multer')
const auth = require('../middleware/auth')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'furniture');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() +  file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

const mongoose = require('mongoose')

const Furniture = require('../models/furniture')



router.get('/', (req, res) => {
    console.log('get')
    Furniture.find()
        .select('_id name price')
        .then(furnitures => {
            if (furnitures.length > 0) {
                res.status(200).json({
                    message: 'Get furnitures',
                    count: furnitures.length,
                    furnitures: furnitures.map(furniture => {
                        return {
                            name: furniture.name,
                            price: furniture.price,
                            furnitureImage: furniture.furnitureImage,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/furnitures/' + furniture._id
                            }
                        }
                    })
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
router.post('/', auth, (req, res) => {

    console.log('file',req.file)

    const newFurniture = new Furniture({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    })

    newFurniture.save().then(furniture => {
        console.log('furniture', furniture)
        res.status(200).json({
            message: 'Post furnitures',
            createdfurniture: {
                name: furniture.name,
                price: furniture.price,
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


router.get('/:furnitureId', (req, res) => {
    Furniture.findById(req.params.furnitureId)
        .then(furniture => {
            console.log('furniture', furniture)
            if (furniture) {
                res.status(200).json({
                    name: furniture.name,
                    price: furniture.price
                })
            } else res.status(400).json({
                message: 'No valid entry found'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                err: err
            })
        })
})


router.delete('/:furnitureId', auth, (req, res) => {

    furniture.remove({
            _id: req.params.furnitureId
        })
        .then(result => {
            res.status(200).json({
                message: 'Delete Success',
                result: result
            })
        }).catch(err => {
            console.log(err), res.status(500).json({
                message: err
            })
        })

})

module.exports = router