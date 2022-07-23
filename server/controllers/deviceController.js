const uuid = require('uuid')
const path = require('path')
const {Device} = require('../models/models')
const ApiError = require('../errors/apiError')

class DeviceController {
    async create(req, resp, next){
        try{
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            return resp.json(device)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
        
    }
    async getAll(req, resp){
        
    }
    async getOne(req, resp){
        const query = req.query
        resp.json({query: `${query}`})
    }
}

module.exports = new DeviceController()