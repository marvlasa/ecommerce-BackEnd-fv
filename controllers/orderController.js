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
        include: [
          {
            model: Client,
            as: "client",
          },
        ],
        include: [
          {
            model: Status,
            as: "status",
          },
        ],
        include: [
          {
            model: Product,
            as: "products",
          },
        ],
      });
      res.json(orders);
    } catch (err) {
      console.log(err);
    }
  },

  indexOrder: async (req, res) => {
    res.jsno("No funciona esto");
  },

  create: async (req, res) => {
    const productsId = [];
    const productsQuantity = [];
    const clientId = 1;
    const cart = [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 2 },
      { id: 3, quantity: 3 },
    ];
    for (let i = 0; i < cart.length; i++) {
      productsId.push(cart[i].id);
      productsQuantity.push(cart[i].quantity);
    }
    await Order.create({ clientId: clientId, statusId: 1 }).then(
      async (order) => {
        await Product.findAll({
          where: { id: productsId },
        }).then(async (products) => {
          for (let i = 0; i < productsId.length; i++) {
            const orderRow = {
              orderId: order.dataValues.id,
              productId: productsId[i],
              quantity: productsQuantity[i],
              price: products[i].dataValues.price,
            };
            OrdersProduct.create(orderRow);
          }
        });
      }
    );
    res.json("complete");
  },

  destroy: async (req, res) => {
    res.json("Esto tampoco");
  },
};
