const { Category } = require("../database/index");

module.exports = {
  indexCategories: async (req, res) => {
    const categories = await Category.findAll();
    res.json({ categories });
  },

  create: async (req, res) => {
    try {
      const name = req.body.name;
      console.log(name);
      const category = await Category.create({
        name: name,
      });
      res.json({ category });
    } catch (error) {
      res.status(400);
    }
  },

  destroy: async (req, res) => {
    try {
      const name = req.body.name;
      await Category.destroy({ where: { name: name } });
      res.json("Se ha borrado con exito");
    } catch (error) {
      res.status(400);
    }
  },

  update: async (req, res) => {
    try {
      const name = req.body.name;
      const newName = req.body.newName;
      await Category.update({ name: newName }, { where: { name: name } });
      res.json("Se ha actualizado con exito");
    } catch (error) {
      res.status(400);
    }
  },
};
