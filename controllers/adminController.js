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
    try {
      const email = req.body.email;
      await Admin.destroy({ where: { email: email } });
      res.json("Se ha borrado el administrador");
    } catch (error) {
      console.log(error);
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
    const { adminEmail, password } = req.body;
    const userInDB = {};
    if (adminEmail) {
      userInDB = await Admin.findOne({ where: { email: admin } });
    }
    if (!userInDB) {
      res.json("No existe el usuario");
    }
    if (!bcrypt.compareSync(password, userDB.password)) {
      res.json("Usuario o contraseña incorrecta");
    }
    const token = jwt.sign(
      {
        userId: userInDB.id,
        name: userInDB.name,
        lastName: userInDB.lastName,
        email: userInDB.email,
      },
      process.env.SECRET_TEXT
    );

    res.json({
      userId: userInDB.id,
      email: userDB.email,
      token,
    });
  },

  register: async (req, res) => {
    const { name, lastName, email, password } = req.body;
    const admin = await Admin.findOne({ where: { email: email } });
    if (admin) {
      res.json("Ya existe el usuario");
    } else {
      try {
        const newUser = await Admin.create({
          name,
          lastName,
          email,
          password: hash(password),
        });
        console.log("Se registró el usuario");
        let token = jwt.sign(
          {
            email,
            userId: newUser.id,
          },
          process.env.SECRET_TEXT
        );
        res.json({
          userId: newUser.id,
          email: newUser.email,
          token,
        });
      } catch (err) {
        console.log(error);
      }
    }
  },
};
