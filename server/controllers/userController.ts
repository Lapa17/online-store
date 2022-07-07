class UserController implements IUserController{
    async registration(req: any, res: any): Promise<any> {

    }

    async login(req: any, res: any): Promise<any> {

    }

    async check(req: any, res: any): Promise<any> {
        await res.json({message: 'OK OK'});
    }
}

module.exports = new UserController();

export interface IUserController {
    registration (req: any, res: any): Promise<any>;
    login (req: any, res: any): Promise<any>
    check (req: any, res: any): Promise<any>
  }