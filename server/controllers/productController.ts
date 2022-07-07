import { ICategoryController } from "./categoryController";
const { Product } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')


export interface IProductController extends ICategoryController{
    getOne (req: any, res: any): void
  }

class ProductController implements IProductController{
    async create(req: any, res: any, next:any) {
      try{
        const { name,price, info, brand_id, category_id } = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const product = await Product.create({ name, price,category_id, brand_id, img:fileName,  })
        return res.json(product)
      }catch(e:any){
        next(ApiError.badRequest(e.message))
      }
        
    }

    async getAll(req: any, res: any) {
      const products = await Product.findAll()
      return res.json(products)
    }
    async getOne(req: any, res: any) {
      const product = await Product.find()
      return res.json(product)
    }

}

module.exports = new ProductController();

