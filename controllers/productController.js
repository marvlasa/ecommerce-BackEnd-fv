const { Product, Category } = require("../database/index");
const slugify = require("slugify");
const { response } = require("express");

module.exports = {
  index: async (req, res) => {
    const products = await Product.findAll({
      limit: 30,
      order: [["createdAt", "DESC"]],
    });
    res.json(products);
  },

  indexHighlightProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { highlight: 1 },
        limit: 3,
        include: Category,
      });
      res.json(products);
    } catch (error) {
      console.log(error);
    }
  },

  indexCategoryProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { categoryId: req.params.id },
        include: Category,
      });
      res.json(products);
    } catch (error) {
      console.log(error);
    }
  },

  indexProduct: async (req, res) => {
    try {
      const product = await Product.findOne({
        where: { slug: req.params.slug },
        include: Category,
      });
      res.json(product);
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    try {
      const { name, description, price } = req.body;
      const image =
        "https://muebles.uy/muebles-cdn/art-img/1161344784233333jpg.jpg";
      const highlight = false;
      const stock = 20;
      const category = 1;
      const product = await Product.create({
        name,
        description,
        image,
        price,
        stock,
        highlight,
        slug: slugify(name.toLowerCase()),
        categoryId: category,
      });
      res.json(product);
    } catch (error) {
      console.log(error);
    }
  },

  destroy: async (req, res) => {
    console.log("holis");
    try {
      const id = req.params.id;
      console.log(id);
      await Product.destroy({ where: { id: id } });
      res.json("Se ha borrado el producto");
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const { name, description, image, price, highlight } = req.body;
      console.log(req.body);

      const id = req.params.id;
      const product = await Product.update(
        {
          name,
          description,
          image,
          price,
          highlight,
          slug: slugify(name.toLowerCase()),
        },

        { where: { id: id } }
      );
      console.log(product);
      res.json(product);
    } catch (error) {
      console.log(error);
    }
  },
};
