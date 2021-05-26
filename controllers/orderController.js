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

  create: async (req, res) => {},

  destroy: async (req, res) => {
    res.json("Esto tampoco");
  },
};
