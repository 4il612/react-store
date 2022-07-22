const userController = require('../controllers/userController')
const express = require('express')

const userRouter = express()

userRouter.post('/register', userController.registration)
userRouter.post('/login', userController.login)

userRouter.get('/auth', userController.check)

module.exports = userRouter