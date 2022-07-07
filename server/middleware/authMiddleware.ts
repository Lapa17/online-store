const jwt = require('jsonwebtoken');

module.exports = function(req:any, res:any, next:any){
     if(req.method === 'OPTIONS'){
        next()
     } 
     try{
        const token = req.headers.autorization.split(' ')[1] // Bearer asdasdasdasd
        if(!token){
            return res.status(401).json({message: 'Unauthorized 1'})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()

     }
     catch(e){
        res.status(401).json({message: 'Unauthorized 2'})
     }
}
