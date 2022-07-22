const express = require('express')

const userRouter = express()

userRouter.post('/register',)
userRouter.post('/login',)

userRouter.get('/auth', (req, resp) => {
    resp.json({message: "auth is good!"})
})

module.exports = userRouter