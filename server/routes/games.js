import express from "express";
import {
  getAllGames,
  getGame,
  addGame,
  deleteGame,
  updateGame,
} from "../controllers/games-controller";
const router = express.Router();

//Game routes
router.get("/", getAllGames);
router.get("/:id", getGame);
router.post("/", addGame);
router.patch("/:id", updateGame);
router.delete("/:id", deleteGame);

export default router;
