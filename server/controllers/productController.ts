import { where } from "sequelize/types";
import { ICategoryController } from "./categoryController";
const { Product , ProductInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')


export interface IProductController extends ICategoryController{
    getOne (req: any, res: any): void
  }

class ProductController implements IProductController{
    async create(req: any, res: any, next:any) {
      try{
        let { name,price, info, brandId, categoryId} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const product = await Product.create({ name, price,categoryId, brandId, img:fileName,  })

        if(info){
          info = JSON.parse(info)
          info.forEach((i:any) => {
            ProductInfo.create({
              title:i.title,
              description:i.description,
              id: product.id,
            })
            
          })
        }


        
        return res.json(product)
      }catch(e:any){
        next(ApiError.badRequest(e.message))
      }
        
    }

    async getAll(req: any, res: any) {
      let {brandId, categoryId, page, limit} = req.query
      page = page || 1  // номер страницы
      limit = limit || 10 // кол-во товаров на странице
      let offset = page*limit - limit // показывает какой пак товарод для конткретной страницы
      let products
      if(!brandId && !categoryId){
        products = await Product.findAndCountAll({limit, offset})
      }
      if(brandId && !categoryId){
        products = await Product.findAndCountAll({where:{brandId}}, limit, offset)
      }
      if(!brandId && categoryId){
        products = await Product.findAndCountAll({where:{categoryId}}, limit, offset)
      }
      if(brandId && categoryId){
        products = await Product.findAndCountAll({where:{brandId, categoryId}}, limit, offset)
      }

      return res.json(products)
    }
    async getOne(req: any, res: any) {
      const {id} = req.params
      const product = await Product.findOne(
        {
          where:{id},
          include:[{model: ProductInfo, as: 'info'}]
      
      })
      return res.json(product)
    }

}

module.exports = new ProductController();

