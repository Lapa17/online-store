require('dotenv').config()
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}))
app.use('/api', router)



// Обработка ошибки, должен быть последний middleware
app.use(errorHandler)

// app.get('/', (req, res) => { //
//     res.status(200).json({message: 'OK'});
// })

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=>console.log('Server started on port '+PORT));
    } catch(err){
        console.log(err);
    }
}

start()