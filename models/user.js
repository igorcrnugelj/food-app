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
  foreignKey: "UserId",
});
Meal.belongsTo(User);

export default User;
await User.sync();
