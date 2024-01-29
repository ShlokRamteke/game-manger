import React, { useEffect, useState } from "react";
import { getAllGames } from "../../api/index.js";
import Game from "./Game/Game.js";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
} from "@mui/material";

//Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";

import { useStyles } from "./styles";

const Library = () => {
  const classes = useStyles();
  const [games, setGames] = useState([]);
  const [recentGames, setRecentGames] = useState([]);

  const getMostRecentGames = (list) => {
    //Copy data and reverce(doesn't modify original list)
    const recent = [...list].reverse();
    setRecentGames(recent.slice(0, 6));
  };

  const handleGames = async () => {
    const { data } = await getAllGames();

    await setGames(data);
    await getMostRecentGames(data);
  };

  useEffect(() => {
    handleGames();
  }, []);
  return (
    <div>
      {/* Recently Added (limit 6) */}

      <div style={{ marginTop: "60px", padding: "0 20px" }}>
        <Typography className={classes.heading} component="h2">
          RECENT GAMES
        </Typography>
        <Grid container spacing={5} justify="center">
          {recentGames &&
            recentGames.map((game, index) => <Game key={index} game={game} />)}
        </Grid>
      </div>

      {/* All Games */}
      <Accordion
        defaultExpanded={true}
        className={classes.list}
        style={{
          marginTop: "40px",
          marginBottom: "30px",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon style={{ color: "white", fontSize: "2rem" }} />
          }
          aria-controls="all-games"
          id="all-games"
        >
          <Typography component="h2">
            ALL GAMES <span style={{ color: "grey" }}>({games.length})</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={5} justify="center">
            {games &&
              games.map((game, index) => <Game key={index} game={game} />)}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Library;
