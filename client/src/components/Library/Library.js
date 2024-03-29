import React, { useState, useEffect } from "react";
import Game from "./Game/Game.js";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
} from "@material-ui/core";

// Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Custom styles
import { useStyles } from "./styles";
const Library = ({ games }) => {
  const classes = useStyles();
  const [recentGames, setRecentGames] = useState([]);

  const getMostRecentGames = () => {
    //Copy data and reverce(doesn't modify original list)
    const recent = [...games].reverse();
    setRecentGames(recent.slice(0, 6));
  };

  useEffect(() => {
    getMostRecentGames();
  }, []);
  return (
    <div>
      {/* Recently Added (limit 6) */}

      <div style={{ marginTop: "60px", padding: "0 10px" }}>
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
