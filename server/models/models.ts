const sequelize = require('../db');
const {DataTypes} = require('sequelize');


const User = sequelize.define('user',{
    id: {type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    email: {type:DataTypes.STRING, unique: true},
    password: {type:DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue:'USER'},
})

const Basket = sequelize.define('basket',{
    id: {type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    // user_id: {type:DataTypes.INTEGER, primaryKey: true}, внешние ключи указывать не нужно

})

const BasketProduct = sequelize.define('basket_product',{
    id: {type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    // basket_id: {type:DataTypes.INTEGER,primaryKey: true},
    // product_id: {type:DataTypes.INTEGER,primaryKey: true},
})


const Product = sequelize.define('product',{
    id: {type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING, unique: true, allowNull:false},
    price: {type:DataTypes.STRING,allowNull:false},
    rating: {type:DataTypes.INTEGER,defaultValue:0},
    img: {type:DataTypes.STRING,allowNull:false},
    // category_id: {type:DataTypes.INTEGER},
    // brand_id: {type:DataTypes.INTEGER},
})

const ProductInfo = sequelize.define('product_info',{
    id: {type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    // product_id: {type:DataTypes.INTEGER},
    title: {type:DataTypes.STRING, allowNull:false},
    description: {type:DataTypes.STRING, allowNull:false},
})

const Brand = sequelize.define('brand',{
    id: {type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING, unique: true, allowNull:false},
})

const Category = sequelize.define('category',{
    id: {type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING, unique: true, allowNull:false},
})

const Rating = sequelize.define('rating',{
    id: {type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    // product_id: {type:DataTypes.INTEGER},
    // user_id: {type:DataTypes.INTEGER},
    rate: {type:DataTypes.INTEGER, allowNull:false},
})

const CategoryBrand = sequelize.define('category_brand',{
    id: {type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
})

// Пишем зависимости как на диаграмме

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

BasketProduct.hasOne(Product)
Product.belongsTo(BasketProduct)

Product.hasMany(ProductInfo)
ProductInfo.belongsTo(Product)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Category.hasMany(Product)
Product.belongsTo(Category)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Category.belongsToMany(Brand, {through: CategoryBrand})
Brand.belongsToMany(Category, {through: CategoryBrand })

module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    ProductInfo,
    Brand,
    Category,
    CategoryBrand,
    Rating,
}

export {};