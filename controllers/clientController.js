const {
  Category,
  Status,
  Client,
  Admin,
  Product,
  Order,
  OrdersProduct,
} = require("../database/index");
const hash = require("../database/bcrypt");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const data = require("../database/data");

module.exports = {
  indexClient: async (req, res) => {
    try {
      //const email = req.user.userToken.email;
      const email = "kevinmullinf@gmail.com";
      const client = await Client.findOne({ where: { email: email } }).then(
        (data) => data.dataValues
      );
      res.json(client);
    } catch (err) {
      console.log(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const client = await Client.findOne({
        where: { email: req.body.email },
      }).then((data) => data.dataValues);
      if (!client) {
        res.json({ error: "User not found" });
      } else {
        if (bcrypt.compareSync(req.body.password, client.password)) {
          const clientToken = { id: client.id, email: client.email };
          jwt.sign({ clientToken }, "/YGVcde3", (err, token) => {
            res.json({
              user: {
                name: client.name,
                lastName: client.lastName,
                email: client.email,
                phone: client.phone,
                address: client.address,
                token,
              },
            });
          });
        } else {
          res.json({ error: "Wrong password" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  },

  register: async (req, res) => {
    try {
      const newClient = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash(req.body.password),
      };
      await Client.create(newClient).then((client) => {
        const clientToken = {
          id: client.dataValues.id,
          email: client.dataValues.email,
        };
        jwt.sign({ clientToken }, "/YGVcde3", (err, token) => {
          res.json({
            user: {
              name: req.body.name,
              lastName: req.body.lastName,
              email: req.body.email,
              token: token,
            },
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  },

  destroy: async (req, res) => {
    try {
      //const email = req.user.userToken.email;
      const email = "AK";
      await Client.destroy({ where: { email: email } });
      res.json("delete success");
    } catch (err) {
      console.log(err);
    }
  },

  update: async (req, res) => {
    //const email = req.user.userToken.email;
    try {
      const email = "AK";
      Client.update(
        {
          name: req.body.name,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash(req.body.password),
          address: req.body.address,
          phone: req.body.phone,
        },
        { where: { email: email } }
      );
      res.json("Updated");
    } catch (err) {
      console.log(err);
    }
  },
};
