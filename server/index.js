import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();

// Adding routes
import authRoutes from "./routes/auth.js";
//import userRoutes from "./routes/users.js";
import gameRoutes from "./routes/games.js";

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//Middleware
app.use("/", authRoutes);
//app.use("/users", userRoutes);
app.use("/games", gameRoutes);

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
