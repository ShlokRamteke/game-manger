import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();

// Adding routes
import userRoutes from "./routes/users.js";
import gameRoutes from "./routes/games.js";

const app = express();
const PORT = process.env.PORT || 5500;

app.use(bodyParser.json());

//Middleware
app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use(cors());

//Routes
app.get("/", (req, res) => res.send("Response from server"));

//Connect to MongoDB database

mongoose
  .connect(process.env.DB_CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Connected to database and runner on PORT:${PORT}`)
    )
  )
  .catch((err) => console.log(err.message));
