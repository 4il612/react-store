class UserController {
    async registration(req, resp){

    }
    async login(req, resp){
        
    }
    async check(req, resp){
        const query = req.query
        resp.json(query.id)
    }
}

module.exports = new UserController()