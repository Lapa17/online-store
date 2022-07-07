const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')

export interface ICategoryController {
  create(req: any, res: any): void
  getAll(req: any, res: any): void
}

class BrandController implements ICategoryController {
  async create(req: any, res: any) {
    const { name } = req.body
    const brand = await Brand.create({ name })
    return res.json(brand)
  }

  async getAll(req: any, res: any) {
    const brand = await Brand.findAll()
    return res.json(brand)
  }
}

module.exports = new BrandController();

