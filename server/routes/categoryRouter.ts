import { ICategoryController } from "../controllers/categoryController"

const Router = require('express')
const router = new Router()
const CategoryController: ICategoryController = require('../controllers/categoryController')

router.get('/', CategoryController.getAll)
router.post('/', CategoryController.create)

module.exports = router 
export {};