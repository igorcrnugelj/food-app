import Product from "../models/Product.js";
import fetch from "node-fetch";
import save from "./DatabaseService.js";
import PropertiesReader from "properties-reader";
var properties = PropertiesReader("properties");

const chooseNutrient = function (list, nut) {
  const testNut = list
    .flat()
    .filter((nutrient) => nutrient.nutrientName === nut);
  return testNut;
};

const saveProduct = async (foodName) => {
  const { prodName } = foodName;
  const res = await fetch(
    // properties.get("foodDataURL")
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${"rc9juMGF98eP8Ck1AbFCFT5tc9P4G7lbW2zdPxx2"}&query=${prodName}`
    // `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${"rc9juMGF98eP8Ck1AbFCFT5tc9P4G7lbW2zdPxx2"}&query=${product}&dataType${dataType}`
  );

  const data = await res.json();

  const result = data.foods.filter((prod) => prod.description === prodName);
  console.log("*******result*********");
  console.log(result);
  console.log("*******result*********");

  const listOfNutrients = Object.entries(result[0].foodNutrients);
  console.log("*******listOfNutrients*********");
  console.log(listOfNutrients);
  console.log("*******listOfNutrients*********");
  const nutrientMeasures = Object.entries(result[0].foodMeasures);
  console.log(nutrientMeasures);
  const [name] = data.foods
    .filter((prod) => prod.description === prodName)
    .map((prodName) => prodName.description);
  console.log(name);

  const [proto] = chooseNutrient(listOfNutrients, "Protein");
  const [sugar] = chooseNutrient(
    listOfNutrients,
    "Sugars, total including NLEA"
  );
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
    // properties.get("foodDataURL")
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${"rc9juMGF98eP8Ck1AbFCFT5tc9P4G7lbW2zdPxx2"}&query=${prodName}`
  );

  const data = await res.json();

  const result = data.foods.filter((prod) => prod.description);

  console.log(result);
  return result;
};

export default saveProduct;
