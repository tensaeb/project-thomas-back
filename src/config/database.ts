import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.PGDATABASEURL;
const dbname = process.env.PGDATABASE;

export const sequelize = new Sequelize(`${url}/${dbname}`);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
