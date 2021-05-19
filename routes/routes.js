const express = require("express");
const router = express.Router();
const products = require("../database/data");

const clientController = require("../controllers/clientController");

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

module.exports = router;
