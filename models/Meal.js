import { Sequelize } from "sequelize";
import sequelize from "../database/pgConnection.js";
import User from "./user.js";

const Meal = sequelize.define("Meal", {
  user_id: {
    type: Sequelize.INTEGER,
  },
});

export default Meal;
await Meal.sync();
