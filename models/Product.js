import { Sequelize } from "sequelize";
import sequelize from "../database/pgConnection.js";
import MealsProduct from "./MealsProduct.js";

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

Product.hasOne(MealsProduct, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
MealsProduct.belongsTo(Product, {
  foreignKey: "product_id",
});

export default Product;
// await Product.sync();
