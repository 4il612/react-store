const express = require('express')
const brandController = require('../controllers/brandController')

const brandRouter = express()

brandRouter.post('/', brandController.create)
brandRouter.get('/', brandController.getAll)

module.exports = brandRouter