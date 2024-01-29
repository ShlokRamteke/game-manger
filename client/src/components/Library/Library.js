import React, { useEffect, useState } from "react";
import { getAllGames } from "../../api/index.js";
import Game from "./Game/Game.js";

import { Grid, Container } from "@mui/material";

import { useStyles } from "./styles";

const Library = () => {
  const classes = useStyles();
  const [games, setGames] = useState([]);

  const handleGames = async () => {
    const { data } = await getAllGames();

    await setGames(data);
  };

  useEffect(() => {
    handleGames();
  }, []);
  return (
    <Grid container spacing={6} justify="center" style={{ marginTop: "40px" }}>
      {games && games.map((game, index) => <Game key={index} game={game} />)}
    </Grid>
  );
};

export default Library;
