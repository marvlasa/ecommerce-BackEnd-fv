const express = require("express");
const router = express.Router();
const products = require("../database/data");
const checkJwt = require("express-jwt");

const clientController = require("../controllers/clientController");
const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");
const adminController = require("../controllers/adminController");
const orderController = require("../controllers/orderController");

const authentification = checkJwt({
  secret: "/YGVcde3",
  algorithms: ["HS256"],
});

router.post("/test", (req, res) => res.json(req.body));

router.post("/testJWT", authentification, (req, res) => {
  res.json(req.user);
});

router.post("/token", clientController.login);
router.post("/client", clientController.register);
router.delete("/client", clientController.destroy);
router.patch("/client", clientController.update);

router.get("/category", categoryController.indexCategories);
router.post("/category", categoryController.create);
router.delete("/category", categoryController.destroy);
router.patch("/category", categoryController.update);

router.get("/products", productController.index);
router.get("/products/highlight", productController.indexHighlightProducts);
router.get("/products/category/:id", productController.indexCategoryProducts);

router.get("/product/:slug", productController.indexProduct);
router.post("/product", productController.create);
router.delete("/product/:id", productController.destroy);
//router.patch("/product/:id", productController.update);

//router.get("/admins", adminController.index);
router.post("/admins", adminController.create);
router.delete("/admins", adminController.destroy);
router.patch("/admins", adminController.update);
router.post("/tokens", adminController.login);

router.get("/orders", orderController.index);
router.get("/order", orderController.indexOrder);
router.post("/order", orderController.create);
router.delete("/order", orderController.destroy);

router.get("/admin/products", authentification, productController.index);
router.get("/admin/product/:slug", productController.indexProduct);
router.patch("/admin/product/:id", authentification, productController.update);

router.get("/admins", authentirfication, adminController.index);

module.exports = router;
