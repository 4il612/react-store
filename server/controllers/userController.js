const ApiError = require('../errors/apiError')
const bcrypt = require('bcrypt')
const {User, Basket} = require('../models/models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateJWT = (id, email, role) =>{
    return jwt.sign({
        id,
        email,
        role
    },
    process.env.SECRET_KEY,
    {expiresIn: '24h'})
}


class UserController {
    async registration(req, resp, next){
        const {email, password, role} = req.body
        if (!email || !password){
            return next(ApiError.badRequest("Incorrect email or password"))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.badRequest("There is one user with same email"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({
            email,
            role,
            password: hashPassword
        })

        const basket = await Basket.create({
            userId: user.id
        })

        const token = generateJWT(user.id, user.email, user.role)
        return resp.json({token})
    }


    async login(req, resp, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.badRequest("This user doesn't exist"))
        }

        if (!bcrypt.compareSync(password, user.password)){
            return next(ApiError.internal("Wrong password!!!"))
        }

        const token = generateJWT(user.id, user.email, user.role)

        return resp.json({token})
    }

    async check(req, resp, next){
        const {id} = req.query
        if (!id){
            return next(ApiError.badRequest('No id'))
        }
        resp.json(id)
    }
}

module.exports = new UserController()