import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
// API calls
import { updateGame, deleteGame } from "../../../../api/index";
import {
  Container,
  Paper,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Fab,
  Typography,
  Link,
} from "@material-ui/core";

// Custom form content
import GameForm from "../../../GameForm";
import FormAlert from "../../../FormAlert";
import { convertToBase64 } from "../../../FileToBase64";

// Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";

// Get single game details
import { getGame } from "../../../../api/index";
// Custom CSS
import { useStyles } from "./styles";

const GameDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [game, setGame] = useState({
    title: "",
    coverArt: "",
    description: "",
    releaseDate: "",
  });

  const getGameDetails = async () => {
    const { data } = await getGame(id);
    //console.log(data[0]);
    await setGame(data);
  };

  // Handle game edit menu
  const [editForm, setEditForm] = useState(false);
  const toggleEditForm = () => setEditForm(!editForm);
  const handleFormChange = async (e) => {
    //if exists, encode the file to base64
    if (e.target.files) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setGame({ ...game, [e.target.name]: base64 });
      return;
    }
    setGame({ ...game, [e.target.name]: e.target.value });
  };

  const handleDeleteGame = async (e) => {
    e.preventDefault();
    const res = await deleteGame(id);

    //Intercept deletion errors
    if (!res.status === 202) {
      setAlertStatus(res.status);
      toggleConfirmationDialog();
      return;
    }
    toggleEditForm();
    setAlertStatus(res.status);
    toggleConfirmationDialog();
  };

  //Submit game update form and call utility functions
  const handleUpdateGame = async (e) => {
    e.preventDefault();

    const res = await updateGame(game, id);

    //Clear input fields
    setGame({
      title: "",
      description: "",
      coverArt: "",
      releaseDate: "",
    });

    //Close Dialog box
    toggleEditForm();
    setAlertStatus(res.status);
    toggleConfirmationDialog();
  };

  //handle form confirmation
  const [alertStatus, setAlertStatus] = useState(200);
  const [confirmation, setConfirmation] = useState(false);
  const toggleConfirmationDialog = () => setConfirmation(!confirmation);

  //update page on id change
  useEffect(() => {
    if (id) {
      getGameDetails();
      document.title = `${game?.title} Details | Game Manager`;
    }
  }, [id]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Paper elevation={7} component="main" className={classes.paper}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={game?.coverArt}
              title={game?.title}
              component="img"
            />

            <CardContent className={classes.cardContent}>
              <Typography variant="h4" gutterBottom component="h2">
                {game?.title}
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="p">
                Release Date: {game?.releaseDate}
              </Typography>
              <Divider variant="middle" className={classes.divider} />
              <Typography component="p">{game?.description}</Typography>
              {/* Rate game? */}
              <CardActions className={classes.cardActions}>
                <Link
                  component={RouterLink}
                  color="primary"
                  underline="hover"
                  className={classes.backLink}
                  to="/games"
                >
                  <ArrowBackIcon /> Go back to library
                </Link>
                {/* Edit button */}
                <Fab
                  aria-label={"Edit game button"}
                  className={classes.edit}
                  color="primary"
                  size="small"
                  onClick={() => toggleEditForm()}
                >
                  <EditIcon />
                </Fab>
              </CardActions>
            </CardContent>
          </Card>
        </Paper>
      </Container>
      {/* *********** GAME EDIT FORM ************ */}
      <GameForm
        isFormOpen={editForm}
        toggleForm={toggleEditForm}
        handleFormChange={handleFormChange}
        game={game}
        handleGame={handleUpdateGame}
        handleDeleteGame={handleDeleteGame}
      />
      {/* Form Confirmation dialog box*/}
      <FormAlert
        confirmation={confirmation}
        toggleConfirmationDialog={toggleConfirmationDialog}
        alertStatus={alertStatus}
        classes={classes}
        getGameDetails={getGameDetails}
      />
    </div>
  );
};

export default GameDetails;
