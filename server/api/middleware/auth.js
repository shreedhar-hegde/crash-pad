const jwt = require('jsonwebtoken')
const keys = require('../../config')
module.exports = async (req, res, next) => {
    try {
        console.log('req', req.headers)
        const token = req.headers.authorization.split(" ")[1]
        console.log('token', token)

        const decoded = await jwt.verify(token, "jwtkey") 
        console.log('decoded', decoded)
        req.userData = decoded;
        next()
    } catch(err) {
        console.log(err)
        return res.status(401).json({message: 'Auth Failed'})
    }

}