const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../errors/apiError')

class DeviceController {
    async create(req, resp, next){
        try{
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if (info){
                console.log(info)
                let res = JSON.parse(info)
                console.log(res)
                res.forEach((i) => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                })
            }

            return resp.json(device)
        } catch (e){
            console.log(e.message)
            next(ApiError.badRequest(e.message))
        } 
    }

    async getAll(req, resp){
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices 
        if (!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId){
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId){
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        return resp.json(devices)
    }

    async getOne(req, resp){
        const {id} = req.params
        const device = await Device.findOne(
            {
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
            },
        )

        return resp.json(device)
    }
}

module.exports = new DeviceController()