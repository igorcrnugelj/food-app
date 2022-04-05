import express from "express";
import fetch from "node-fetch";
import usersRoutes from "./routes/userRoutes.js"; //Here we could give any name instead usersRoutes!
import bodyParser from "body-parser";
import sequelize from "./database/pgConnection.js";
import Product from "./models/Product.js";
import productRoutes from "./routes/ProductRoutes.js";
import Meal from "./models/Meal.js";
import MealsProduct from "./models/MealsProduct.js";
import fiboRoutes from "./routes/FiboRoutes.js";
import mealRoutes from "./routes/MealRoutes.js";

sequelize.sync();

const app = express();
const port = 5000;
app.use(bodyParser.json());

app.use("/users", usersRoutes);
app.use("/product", productRoutes);
app.use("/fibo", fiboRoutes);
app.use("/meal", mealRoutes);

app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);

// app.get("/", (req, res) => res.send("Hello from Homepage ✨✨✨"));

// findProduct("Cheese, cheddar", " ");
// findProduct("Milk", " ");
// findProduct("Acerola juice, raw", " ");
// findProduct("Celery, raw", " ");
// findProduct("Cherries, raw", " ");
// findProduct("Broccoli, raw");
