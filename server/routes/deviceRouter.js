const express = require('express')
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/CheckRoleMiddleware')

const deviceRouter = express()

deviceRouter.post('/', checkRole('ADMIN'), deviceController.create)
deviceRouter.get('/', deviceController.getAll)
deviceRouter.get('/:id', deviceController.getOne)

module.exports = deviceRouter