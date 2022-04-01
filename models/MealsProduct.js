import { Sequelize } from "sequelize";
import sequelize from "../database/pgConnection.js";
import Meal from "./Meal.js";

const MealsProduct = sequelize.define("MealProduct", {
  meal_id: {
    type: Sequelize.INTEGER,
  },
  product_id: {
    type: Sequelize.INTEGER,
  },
});

export default MealsProduct;
await Meal.sync();
