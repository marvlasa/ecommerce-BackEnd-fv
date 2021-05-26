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

const findOneClient = async (req, res) => {
  //const email = req.user.userToken.email;
  const email = "kevinmullinf@gmail.com";
  const client = await Client.findOne({ where: { email: email } }).then(
    (data) => data.dataValues
  );
  res.json(client);
};

const loginClient = async (req, res, next) => {
  const client = await Client.findOne({
    where: { email: req.body.email },
  }).then((data) => data.dataValues);
  const clientToken = { id: client.id, email: client.email };
  console.log(clientToken);
  if (!client) {
    res.json({ error: "User not found" });
  } else {
    if (bcrypt.compareSync(req.body.password, client.password)) {
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
};

const createClient = async (req, res) => {
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
    console.log(clientToken);
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
};

const deleteClient = async (req, res) => {
  //const email = req.user.userToken.email;
  const email = "AK";
  await Client.destroy({ where: { email: email } });
  res.json("delete success");
};

const editClient = async (req, res) => {
  //const email = req.user.userToken.email;
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
};

module.exports = {
  findOneClient,
  loginClient,
  createClient,
  deleteClient,
  editClient,
};
