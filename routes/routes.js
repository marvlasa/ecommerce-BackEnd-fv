const express = require("express");
const router = express.Router();
const products = require("../database/data");

const clientController = require("../controllers/clientController");
const categoryController = require("../controllers/categoryController");

router.get("/products", (req, res) => res.json(products));
//router.get("/product/:id", (req, res) => res.json(products[req.params.id - 1]));
router.get("/product/:slug", (req, res) =>
  products.forEach((element, index) => {
    if (element.slug === req.params.slug) {
      res.json(products[index]);
    }
  })
);

router.get("/client", clientController.findOneClient);
router.post("/client", clientController.createClient);
router.delete("/client", clientController.deleteClient);
router.patch("/client", clientController.editClient);

router.get("/category", categoryController.indexCategories);
router.post("/category", categoryController.create);
router.delete("/category", categoryController.destroy);
router.patch("/category", categoryController.update);

module.exports = router;
