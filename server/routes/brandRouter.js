const express = require('express')
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/CheckRoleMiddleware')

const brandRouter = express()

brandRouter.post('/', checkRole('ADMIN'), brandController.create)
brandRouter.get('/', brandController.getAll)

module.exports = brandRouter