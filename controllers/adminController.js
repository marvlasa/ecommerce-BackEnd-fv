const { Admin } = require("../database/index");
const hash = require("../database/bcrypt");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  index: async (req, res) => {
    const admins = await Admin.findAll();
    res.json(admins);
  },

  create: async (req, res) => {
    try {
      const { name, lastName, email, password } = req.body;
      const admin = await Admin.create({
        name,
        lastName,
        email,
        password: hash(password),
      });
      res.json(admin);
    } catch (error) {
      console.log(error);
    }
  },

  destroy: async (req, res) => {
    if (req.user.adminToken.email !== req.body.email) {
      try {
        const email = req.body.email;
        await Admin.destroy({ where: { email: email } });
        res.json("Se ha borrado el administrador");
      } catch (error) {
        console.log(error);
      }
    } else {
      res.json("SAME ACCOUNT");
    }
  },

  update: async (req, res) => {
    try {
      const email = req.body.email;
      const { name, lastName, newEmail, password } = req.body;
      const admin = await Admin.update(
        {
          name,
          lastName,
          email: newEmail,
          password: hash(password),
        },
        { where: { email: email } }
      );
      res.json(admin);
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const userInDB = await Admin.findOne({ where: { email: email } });
    if (!userInDB) {
      res.json("No existe el usuario");
    } else if (!bcrypt.compareSync(password, userInDB.dataValues.password)) {
      res.json("Contraseña incorrecta");
    } else {
      const adminToken = {
        id: userInDB.dataValues.id,
        email: userInDB.dataValues.email,
      };
      const token = jwt.sign({ adminToken }, "/YGVcde3");
      res.json({
        admin: {
          name: userInDB.dataValues.name,
          lastName: userInDB.dataValues.lastName,
          email: userInDB.dataValues.email,
        },
        token,
      });
    }
  },
};
