import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { Grid, Card, Link, CardMedia } from "@material-ui/core";

import { useStyles } from "./styles";

const Game = ({ game }) => {
  const classes = useStyles();
  const { _id, title, coverArt } = game;

  return (
    <>
      <Grid item xs={12} sm={4} md={4} lg={2}>
        <Link
          component={RouterLink}
          to={`/games/${_id}`}
          className={classes.cardLink}
        >
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={coverArt ? coverArt : "https://source.unsplash.com/random"}
              title={title}
              component="img"
            />
          </Card>
        </Link>
      </Grid>
    </>
  );
};

export default Game;
