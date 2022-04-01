import Product from "../models/Product.js";

const save = async (nameOfProduct, proteins, sugars) => {
  try {
    const lastProduct = await Product.create({
      productName: nameOfProduct,
      protein: proteins,
      sugar: sugars,
    });

    return lastProduct;
  } catch (err) {
    res.status(500).send("User is not created");
    console.log(err.message);
    return;
  }
};

export default save;
