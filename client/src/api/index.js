import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5500/" });

//Get games
export const getAllGames = () => API.get("/games");

//Get specified game
export const getGame = (id) => API.get(`/games/${id}`);

// Add new game
export const addGame = (newGame) => API.post("/games", newGame);

//Edit Game data
export const updateGame = (updatedGame, id) =>
  API.patch(`/games/${id}`, updatedGame);

//Delete Game
export const deleteGame = (id) => API.delete(`/games/${id}`);
