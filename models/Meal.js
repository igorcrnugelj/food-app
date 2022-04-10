import { Sequelize } from "sequelize";
import sequelize from "../database/pgConnection.js";
import MealsProduct from "./MealsProduct.js";
import User from "./user.js";

const Meal = sequelize.define("Meal", {
  UserId: {
    type: Sequelize.INTEGER,
  },
});

Meal.hasMany(MealsProduct, {
  foreignKey: "meal_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
MealsProduct.belongsTo(Meal, {
  foreignKey: "meal_id",
});

export default Meal;
await Meal.sync();
