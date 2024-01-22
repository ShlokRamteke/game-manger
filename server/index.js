import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

// Adding routes
import userRoutes from "./routes/user.js"

const app=express();
const PORT=process.env.PORT || 5500;

app.use(bodyParser.json());

//Routes
app.get("/", (res,req)=>res.send("Response from server"));

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})