import { Sequelize } from "sequelize";
import sequelize from "../database/pgConnection.js";

const Product = sequelize.define("Product", {
  productName: {
    type: Sequelize.STRING,
    unique: true,
  },
  protein: {
    type: Sequelize.STRING,
  },
  sugar: {
    type: Sequelize.STRING,
  },
});

export default Product;
// await Product.sync();
