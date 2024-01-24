import React, { useEffect, useState } from "react";
import { getAllGames } from "../../api/index.js";
import Game from "./Game/Game.js";

import { Paper, Grid, Typography, Container, Avatar } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

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
    <Grid container className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item component="header">
          <Paper className={classes.header} square>
            <Typography variant="h3" component="h1">
              Game Manager
            </Typography>
            <Avatar variant="rounded" className={classes.avatarLarge}>
              <SportsEsportsIcon fontSize="large" />
            </Avatar>
          </Paper>
        </Grid>
        {/* Games section */}
        <Container>
          <Container maxWidth="lg" className={classes.cardGrid}>
            <Grid container spacing={4} justify="center">
              {games &&
                games.map((game, index) => <Game key={index} game={game} />)}
            </Grid>
          </Container>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Library;
