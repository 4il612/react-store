const express = require('express')
const typeController = require('../controllers/typeController')

const typeRouter = express()

typeRouter.post('/', typeController.create)
typeRouter.get('/', typeController.getAll)

module.exports = typeRouter