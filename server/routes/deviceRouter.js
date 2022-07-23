const express = require('express')
const deviceController = require('../controllers/deviceController')

const deviceRouter = express()

deviceRouter.post('/', deviceController.create)
deviceRouter.get('/', deviceController.getAll)
deviceRouter.get('/:id', deviceController.getOne)

module.exports = deviceRouter