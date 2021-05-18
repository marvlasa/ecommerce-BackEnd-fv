"use strict";

module.exports = (sequelize, DataTypes, Order, Product) => {
  const OrdersProduct = sequelize.define("ordersProduct", {
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return OrdersProduct;
};
