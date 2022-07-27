const jwt = require('jsonwebtoken')

module.exports = function(req, resp, next){
    if (req.method === "OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            return resp.status(401).json({message: "User is not authorized"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded 
        next()
    } catch (e){
        return resp.status(401).json({message: "User is not authorized"})
    }
}