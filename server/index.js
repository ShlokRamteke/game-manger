import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

// Adding routes
import userRoutes from "./routes/users.js"

const app=express();
const PORT=process.env.PORT || 5500;

app.use(bodyParser.json());

//Middleware
app.use("/users", userRoutes);

//Routes
app.get("/", (req,res)=>res.send("Response from server"));

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})