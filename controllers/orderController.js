const { forEach } = require("../database/data");
const {
  Status,
  Client,
  Product,
  Order,
  OrdersProduct,
} = require("../database/index");
const productController = require("./productController");

module.exports = {
  index: async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: [Product, Status, Client],
      });
      res.json(orders);
    } catch (err) {
      console.log(err);
    }
  },

  indexOrders: async (req, res) => {
    const clientId = req.user.clientToken.id;
    try {
      const orders = await Order.findAll({
        include: [Product, Status, Client],

        where: {
          clientId: clientId,
        },
      });
      res.json(orders);
    } catch (err) {
      console.log(err);
    }
  },

  indexSingleOrder: async (req, res) => {
    const id = req.params.id;
    try {
      const order = await Order.findOne({
        include: [Product, Status, Client],

        where: {
          id: id,
        },
      });
      res.json(order);
    } catch (err) {
      console.log(err);
    }
  },

  create: (req, res) => {
    const productsId = [];
    const clientId = req.user.clientToken.id;
    const cart = req.body;
    if (cart.length >= 1) {
      cart.forEach((item) => productsId.push(item.id));
      Order.create({ clientId: clientId, statusId: 1 }).then((order) => {
        Product.findAll({
          where: { id: productsId },
        }).then((products) => {
          productsId.forEach((id, i) => {
            const orderRow = {
              orderId: order.dataValues.id,
              productId: id,
              quantity: cart[i].quantity,
              price: products[i].dataValues.price,
            };
            OrdersProduct.create(orderRow);
          });
        });
      });
      res.json("complete");
    } else {
      console.log("no");
    }
  },

  destroy: async (req, res) => {
    res.json("Esto tampoco");
  },
};
