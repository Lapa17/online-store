import { ICategoryController } from "./categoryController";

export interface IProductController extends ICategoryController{
    getOne (req: any, res: any): void
  }

class ProductController implements IProductController{
    async create(req: any, res: any) {

    }

    async getAll(req: any, res: any) {

    }
    async getOne(req: any, res: any) {

    }

}

module.exports = new ProductController();

