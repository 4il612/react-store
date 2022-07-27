const userController = require('../controllers/userController')
const express = require('express')
const AuthMiddleware = require('../middleware/AuthMiddleware')

const userRouter = express()

userRouter.post('/register', userController.registration)
userRouter.post('/login', userController.login)

userRouter.get('/auth', AuthMiddleware, userController.check)

module.exports = userRouter