export interface ICategoryController {
    create (req: any, res: any): void
    getAll (req: any, res: any): void
  }

class BrandController implements ICategoryController{
    async create(req: any, res: any) {

    }

    async getAll(req: any, res: any) {

    }
}

module.exports = new BrandController();

