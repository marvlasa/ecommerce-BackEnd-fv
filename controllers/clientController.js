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

const findOneClient = async (req, res) => {
  //const email = req.user.userToken.email;
  const email = "kevinmullinf@gmail.com";
  const client = await Client.findOne({ where: { email: email } }).then(
    (data) => data.dataValues
  );
  res.json(client);
};

const createClient = async (req, res) => {
  console.log(req.body);
  const newClient = {
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash(req.body.password),
    address: req.body.address,
    phone: req.body.phone,
  };
  await Client.create(newClient);
  res.json(req.body);
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

module.exports = { findOneClient, createClient, deleteClient, editClient };