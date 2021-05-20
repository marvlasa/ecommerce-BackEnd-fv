const { Product } = require("../database/index");
const slugify = require("slugify");

module.exports = {
  index: async (req, res) => {
    const products = await Product.findAll();
    // products.map((product) => {
    //   return product;
    // });

    res.json({ products });
  },

  indexProduct: async (req, res) => {
    try {
      const slug = req.query.slug;
      const product = await Product.findAll({
        where: { slug: slug },
      });
      res.json({ product });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    try {
      const {
        name,
        description,
        image,
        price,
        stock,
        highlight,
        category,
      } = req.body;
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
      res.json({ product });
    } catch (error) {
      console.log(error);
    }
  },

  destroy: async (req, res) => {
    try {
      const slug = req.query.slug;
      await Product.destroy({ where: { slug: slug } });
      res.json("Se ha borrado el producto");
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const slug = req.query.slug;
      const { name, description, image, price, stock, highlight } = req.body;
      const product = await Product.update(
        { name, description, image, price, stock, highlight },
        { where: { slug: slug } }
      );
      res.json({ product });
    } catch (error) {
      console.log(error);
    }
  },
};
