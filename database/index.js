"use strict";
const { Sequelize, Model, DataTypes } = require("sequelize");

const ProductModel = require("../models/Product.js");
const ClientModel = require("../models/Client.js");
const OrderModel = require("../models/Order.js");
const AdminModel = require("../models/Admin.js");
const StatusModel = require("../models/Status.js");
const OrdersProductModel = require("../models/Orders-Product.js");
const CategoryModel = require("../models/Category.js");

const pg = require("pg");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASS,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    dialectModule: pg,
    logging: false,
  }
);

const Product = ProductModel(sequelize, Sequelize);
const Client = ClientModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
const Admin = AdminModel(sequelize, Sequelize);
const Status = StatusModel(sequelize, Sequelize);
const OrdersProduct = OrdersProductModel(sequelize, Sequelize, Order, Product);
const Category = CategoryModel(sequelize, Sequelize);

Product.belongsTo(Category);
Category.hasMany(Product);
Client.hasMany(Order);
Order.belongsTo(Client);
Order.belongsTo(Status);
Status.hasMany(Order);
Order.belongsToMany(Product, { through: OrdersProduct });
Product.belongsToMany(Order, { through: OrdersProduct });

module.exports = {
  sequelize,
  Sequelize,
  Product,
  Client,
  Order,
  Admin,
  Status,
  OrdersProduct,
  Category,
};
