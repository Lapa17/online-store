import { where } from 'sequelize/types';
const ApiError = require('../error/ApiError')
const {User, Basket} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export interface IUserController {
    registration (req: any, res: any, next?:any): void
    login (req: any, res: any, next?:any): void
    check (req: any, res: any, next:any): void
  }

const generateJwt = (id:number, email:string, role:string) => {
    return jwt.sign({id,email, role}, process.env.SECRET_KEY, {expiresIn:'72h'})
}

class UserController implements IUserController{
    async registration(req: any, res: any, next: any){
        const {email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Enter email and password'))
        }

        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest('User already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password:hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }

    async login(req: any, res: any, next: any) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.badRequest('User not found'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest('Password is incorrect'))
        }
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }

    async check(req: any, res: any, next:any) {
        return res.json({message:'OK'})
    }
}

module.exports = new UserController();

