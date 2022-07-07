import { IUserController } from "../controllers/userController"

const Router = require('express')
const router = new Router()
const UserController: IUserController = require('./../controllers/userController')

router.get('/auth', UserController.check)
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)

module.exports = router 
export {};