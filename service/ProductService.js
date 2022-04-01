import Product from "../models/Product.js";
import fetch from "node-fetch";
import save from "./DatabaseService.js";

const saveProduct = async (foodName) => {
  const { prodName } = foodName;
  const res = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${"rc9juMGF98eP8Ck1AbFCFT5tc9P4G7lbW2zdPxx2"}&query=${prodName}`
    // `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${"rc9juMGF98eP8Ck1AbFCFT5tc9P4G7lbW2zdPxx2"}&query=${product}&dataType${dataType}`
  );

  const data = await res.json();

  const result = data.foods.filter((prod) => prod.description === prodName);

  console.log(result);

  const listOfNutrients = Object.entries(result[0].foodNutrients);
  const nutrientMeasures = Object.entries(result[0].foodMeasures);
  console.log(nutrientMeasures);
  const [name] = data.foods
    .filter((prod) => prod.description === prodName)
    .map((prodName) => prodName.description);
  console.log(name);

  const chooseProtein = function (listOfNutrients) {
    const protein = listOfNutrients
      .flat()
      .filter((nutrient) => nutrient.nutrientName === "Protein");
    return protein;
  };
  const chooseSugars = function (listOfNutrients) {
    return listOfNutrients
      .flat()
      .filter(
        (nutrient) => nutrient.nutrientName === "Sugars, total including NLEA"
      );
  };

  const [proto] = chooseProtein(listOfNutrients);
  const [sugar] = chooseSugars(listOfNutrients);
  console.log(proto.nutrientName, proto.value);
  console.log(sugar.nutrientName, sugar.value);

  let proteins = proto.value;
  let sugars = sugar.value;

  const lastOne = save(name, proteins, sugars);

  return lastOne;
};

export const retProducts = async (foodName) => {
  const { prodName } = foodName;
  const res = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${"rc9juMGF98eP8Ck1AbFCFT5tc9P4G7lbW2zdPxx2"}&query=${prodName}`
  );

  const data = await res.json();
  //   console.log(data);

  //   const result = data.foods.filter((prod) => prod.description === prodName);
  const result = data.foods.filter((prod) => prod.description);

  console.log(result);
  return result;
};

let c;
let arr = [1, 1];
const getFib = (a, b) => {
  c = b + a;
  arr.push(c);
  while (c < 610) {
    getFib(b, c);
  }
};
getFib(1, 1);
console.log(...arr);
console.log("Test");

export default saveProduct;
