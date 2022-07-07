const {Sequelize} = require('sequelize')


module.exports = new Sequelize(
    process.env.DB_NAME, // название бд
    process.env.DB_USER, // имя пользователя бд
    process.env.DB_PASSWORD,    // пароль от бд
    {
        dialect:'postgres', // какая субд
        host:process.env.DB_HOST, // т.к пока разработка, то localhost
        port:process.env.DB_PORT, // порт нашей бд
    }
)