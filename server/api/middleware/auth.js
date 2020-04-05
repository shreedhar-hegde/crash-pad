const jwt = require('jsonwebtoken')
const keys = require('../../config')
module.exports = async (req, res, next) => {
    console.log('req headers', req.headers)
    try {
        const token = req.headers.authorization.split(" ")[1]

        const decoded = await jwt.verify(token, "jwtkey") 
        req.userData = decoded;
        console.log('decoded',decoded)
        next()
    } catch(err) {
        console.log(err)
        return res.status(401).json({message: 'Auth Failed'})
    }

}