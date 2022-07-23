const ApiError = require('../errors/apiError')

class UserController {
    async registration(req, resp){

    }
    async login(req, resp){
        
    }
    async check(req, resp, next){
        const {id} = req.query
        if (!id){
            return next(ApiError.badRequest('No id'))
        }
        resp.json(id)
    }
}

module.exports = new UserController()