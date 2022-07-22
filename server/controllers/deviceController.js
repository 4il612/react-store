class DeviceController {
    async create(req, resp){

    }
    async getAll(req, resp){
        
    }
    async getOne(req, resp){
        const query = req.query
        resp.json({query: `${query}`})
    }
}

module.exports = new DeviceController()