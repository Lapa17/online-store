const ApiError = require('../error/ApiError')

export interface IUserController {
    registration (req: any, res: any): void
    login (req: any, res: any): void
    check (req: any, res: any, next:any): void
  }

class UserController implements IUserController{
    async registration(req: any, res: any) {

    }

    async login(req: any, res: any) {

    }

    async check(req: any, res: any, next:any) {
        const {id} = req.query
        if(!id){
           return next(ApiError.badRequest('Id is not found'))
        }
        res.json(id);
    }
}

module.exports = new UserController();

