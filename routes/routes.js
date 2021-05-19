const express = require("express");
const router = express.Router();
const products = require("../database/data");

router.get("/products", (req, res) => res.json(products));
router.get("/product/:id", (req, res) => res.json(products[req.params.id - 1]));

module.exports = router;
