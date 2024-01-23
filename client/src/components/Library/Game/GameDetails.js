import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

//Get a single game details
import { getGame } from "../../../api/index.js";

// This page is used to display more info about the game and also allow the user to edit the data

const GameDetails = () => {
  const [game, setGame] = useState({});
  const { id } = useParams();

  const getGameDetails = async () => {
    const { data } = await getGame(id);
    await setGame(data);
  };

  //Fetch game from DB
  useEffect(() => {
    if (id) {
      getGameDetails();
    }
  }, []);

  return (
    <div>
      <h2>Game details</h2>
      <Link style={{ color: "blue", textDecoration: "underline" }} to="/games">
        Go back to library
      </Link>
      <p>{game.title}</p>
    </div>
  );
};
export default GameDetails;
