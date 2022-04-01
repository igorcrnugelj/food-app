import { Sequelize } from "sequelize";
import sequelize from "../database/pgConnection.js";
import Meal from "./Meal.js";

const User = sequelize.define("User", {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.STRING,
  },
});

User.hasMany(Meal, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default User;
await User.sync();
