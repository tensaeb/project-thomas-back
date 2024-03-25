import express, { Application } from "express";
import cookieParser from "cookie-parser";

import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/database";
import authRoutes from "./routes/authRoutes";

const app: Application = express();

//cors
app.use(cors());

//dotenv config
dotenv.config();

// Use cookie-parser middleware
app.use(cookieParser());

//Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//declare port
const PORT: number = 3006;

//routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome To JWT Authentication </h1>");
});

app.listen(PORT, async () => {
  console.log(`🗄️ Server Fire on Port:${PORT}`);

  // Connect To The Database
  try {
    await sequelize.authenticate();
    console.log("🛢️  Connected To Database");
  } catch (error) {
    console.log("⚠️ Error to connect Database");
  }
});
