import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [];

// Routes starting at /users

router.get("/", (res, req) => {
  res.send(users);
});

//Allow client to create a new user
router.post("/", (req, res) => {
  //Add a user to the database
  const user = req.body;

  //Create a user with a unique ud and add to DB
  users.push({ ...user, id: uuidv4() });

  res.send(
    `The user:${user.firstName} ${user.lastName} was add to the database.`
  );
});

//Fetch a single user from the database
router.get("/:id", (req, res) => {
  // Get user id
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
});

//Update a specified user in the database
router.patch("/:id", (req, res) => {
  const id = req.params;

  const { firstName, lastName, age } = req.body;
  //Find the user using id
  const user = users.find((user) => user.id == id);

  //Checking conditions for duplicates
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;

  res.send(`User id:${id} updated`);
});

//Remove user from database
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  //Remove the specified user from the database
  users = users.filter((user) => user.id !== id);
  res.send(`User id:${id} deleted from database`);
});

export default router;
