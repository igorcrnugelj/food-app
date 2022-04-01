import express from "express";
import Product from "../models/Product.js";
import saveProduct from "../service/ProductService.js";
import { retProducts } from "../service/ProductService.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const foodName = req.body;
  const savedProduct = await saveProduct(foodName);

  const savedProductStringifyed = JSON.stringify(savedProduct, null, "\t");
  res.send(`Product inserted into database: \n ${savedProductStringifyed}`);
});

router.post("/products", async (req, res) => {
  const foodName = req.body;
  const retrieveProducts = await retProducts(foodName);

  const retrieveProductsStringifyed = JSON.stringify(
    retrieveProducts,
    ["fdcId", "description", "foodCategory"],
    "\t"
  );
  res.send(`Product inserted into database: \n ${retrieveProductsStringifyed}`);
});

export default router;
