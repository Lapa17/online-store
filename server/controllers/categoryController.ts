const { Category } = require('../models/models')
const ApiError = require('../error/ApiError')

export interface ICategoryController {
    create(req: any, res: any, next?:any): void
    getAll(req: any, res: any): void
}

class CategoryController implements ICategoryController {
    async create(req: any, res: any) {
        const { name } = req.body
        const category = await Category.create({ name })
        return res.json(category)
    }

    async getAll(req: any, res: any) {
        console.log(req, res)
        const category = await Category.findAll()
        return res.json(category)
    }
}

module.exports = new CategoryController();

