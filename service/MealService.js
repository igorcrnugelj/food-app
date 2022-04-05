import Meal from "../models/Meal.js";
import MealsProduct from "../models/MealsProduct.js";

const createMeal = async (userId) => {
  let mealCreated;
  try {
    mealCreated = await Meal.create({ UserId: userId });
    console.log(mealCreated);
  } catch (err) {
    // res.status(500).send("User is not created");
    console.log(err.message);
    return;
  }

  const mealId = mealCreated.dataValues.id;
  return mealId;
};

export const addProductToMeal = async (mealProduct) => {
  const { product_id, quantity, meal_id } = mealProduct;

  let mealWithProduct;
  try {
    mealWithProduct = await MealsProduct.create({
      product_id,
      quantity,
      meal_id,
    });
  } catch (error) {
    console.log(error.message);
  }
  return mealWithProduct;
};

export const addMultipleProductsToMeal = async (mealProduct) => {
  console.log(mealProduct);
  await mealProduct.map(async (pr) => {
    try {
      await MealsProduct.create({
        product_id: pr.product_id,
        quantity: pr.quantity,
        meal_id: pr.meal_id,
      });
    } catch (error) {
      console.log(error.message);
    }
  });
  return mealProduct;
};

export default createMeal;
