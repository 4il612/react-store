const ApiError = require('../errors/apiError')

module.exports = function (err, req, resp, next){
    if (err instanceof ApiError){
        return resp.status(err.statuscode).json({message: err.message})
    }
    return resp.status(500).json({message: "Nepredvid"})
}