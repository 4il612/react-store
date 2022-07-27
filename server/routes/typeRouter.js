const express = require('express')
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/CheckRoleMiddleware')

const typeRouter = express()

typeRouter.post('/', checkRole('ADMIN'), typeController.create)
typeRouter.get('/', typeController.getAll)

module.exports = typeRouter