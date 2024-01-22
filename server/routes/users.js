import express from "express";
import {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";


const router = express.Router();


// Routes starting at /users

router.get("/", getUser);

//Allow client to create a new user
router.post("/", createUser);

//Fetch a single user from the database
router.get("/:id", getAllUsers);

//Update a specified user in the database
router.patch("/:id", updateUser);

//Remove user from database
router.delete("/:id", deleteUser);

export default router;
