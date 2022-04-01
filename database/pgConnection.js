import { Sequelize } from "sequelize";
import PropertiesReader from "properties-reader";
var properties = PropertiesReader("properties");

const sequelize = new Sequelize(
  properties.get("database"),
  properties.get("username"),
  properties.get("password"),
  {
    host: properties.get("hostname"),
    dialect: properties.get("dialect"),
  }
);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// sequelize.sync().then(
//   (data) => {
//     console.log(data);
//   },
//   (error) => {
//     console.error(error);
//   }
// );

export default sequelize;
