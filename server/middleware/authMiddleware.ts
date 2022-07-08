import console from "console";

const jwt = require('jsonwebtoken');

module.exports = function(req:any, res:any, next:any){
     if(req.method === 'OPTIONS'){
        next()
     } 
     try{
         
        const token = req.headers.authorization.split(' ')[1] // Bearer asdasdasdasd
        if(!token){
            return res.status(401).json({message: 'Unauthorized 1'})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()

     }
     catch(e:any){
        res.status(401).json({message: e.message})
     }
}
