const { forEach } = require("../database/data");
const {
  Status,
  Client,
  Product,
  Order,
  OrdersProduct,
} = require("../database/index");

module.exports = {
  index: async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: Client,
        include: Status,
        include: Product,
      });
      res.json(orders);
    } catch (err) {
      console.log(err);
    }
  },

  indexOrder: async (req, res) => {
    res.json("No funciona esto");
  },

  create: (req, res) => {
    const productsId = [];
    const clientId = 1;
    const cart = [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 2 },
      { id: 3, quantity: 3 },
    ];
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
  },

  destroy: async (req, res) => {
    res.json("Esto tampoco");
  },
};
