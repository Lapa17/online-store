import { IProductController } from "../controllers/productController"

const Router = require('express')
const router = new Router()
const ProductController:IProductController  = require('../controllers/productController')


router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne)
router.post('/', ProductController.create)

module.exports = router 
export {};