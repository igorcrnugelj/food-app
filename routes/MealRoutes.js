import express from "express";
const router = express.Router();
import Meal from "../models/Meal.js";
import User from "../models/user.js";
import createMeal from "../service/MealService.js";
import { addProductToMeal } from "../service/MealService.js";
import { addMultipleProductsToMeal } from "../service/MealService.js";
import MealProduct from "../models/MealsProduct.js";
import Product from "../models/Product.js";

//CREATE MEAL
router.post("/", async (req, res) => {
  const { UserId } = req.body;
  const createdMeal = await createMeal(UserId);
  //   const savedProductStringifyed = JSON.stringify(savedProduct, null, "\t");
  res.send(`Meal with id: ${createdMeal} created in Database`);
});

//ADD MULTIPLE PRODUCTS TO MEAL
router.post("/add-products", async (req, res) => {
  const mealProduct = req.body;
  const element = await addMultipleProductsToMeal(mealProduct);
  const savedProductStringifyed = JSON.stringify(element, null, "\t");
  res.send(`Products added into the database: ${savedProductStringifyed}`);
});

//GET MEAL BY USER ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; //here we are making destructuring
    const mealProducts = await MealProduct.findAll({
      where: { meal_id: id },
    });
    const mealProductsIds = mealProducts.map(
      (mealProduct) => mealProduct.dataValues.product_id
    );

    const infoAboutProducts = mealProducts[0];

    const products = await Product.findAll({
      where: {
        id: mealProductsIds,
      },
    });
    const productName = products.map(
      (product) => product.dataValues.productName
    );
    const productsProteins = products.map(
      (product) => product.dataValues.protein
    );

    const productsProteinsTotal = productsProteins.reduce(
      (prev, curr) => prev + curr
    );

    const yourMeal = {
      message: "This is your first meal: ",
      productName: productName,
      protein: productsProteins,
      proteinsTotal: productsProteinsTotal,
    };

    console.log("************mealProducts********");
    console.log(mealProductsIds);
    console.log("************mealProducts********");
    console.log("************infoAboutProducts********");
    console.log(infoAboutProducts);
    console.log(infoAboutProducts.dataValues.product_id);
    console.log("************infoAboutProducts********");
    console.log("************Products********");
    console.log(products);
    console.log("Your meal: ", yourMeal);
    console.log("************Products********");
    // const mealByUserId = await Meal.findAll();
    //const mealById = await Meal.findByPk(id);
    // const meal1 = mealByUserId.filter((meal) => meal.UserId === Number(id));
    // console.log("This is the meal by user id:", meal1);
    if (!yourMeal) {
      throw new Error(`No meal with such id found in database`);
    }
    //   const foundUser = users.find((user) => user.id === id);
    //   res.send(foundUser);
    res.send(yourMeal);
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
});

export default router;
