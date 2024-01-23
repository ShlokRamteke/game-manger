import { v4 as uuidv4 } from "uuid";

//Temp database
let users = [];

//Get a single user
export const getUser = (req, res) => res.send(users);

//Get all useres
export const getAllUsers = (req, res) => {
  //Get user id
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
};

// Add a new user
export const createUser = (req, res) => {
  //Add user to database
  const user = req.body;

  //Create a unique id for user; add to database
  users.push({ ...users, id: uuidv4() });

  res.send(
    `The user:${user.firstName} ${user.lastName} was add to the database.`
  );
};

export const updateUser = (req, res) => {
  const id = req.params;

  const { firstName, lastName, age } = req.body;
  //Find the user using id
  const user = users.find((user) => user.id == id);

  //Checking conditions for duplicates
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;

  res.send(`User id:${id} updated`);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  //Remove the specified user from the database
  users = users.filter((user) => user.id !== id);
  res.send(`User id:${id} deleted from database`);
};
