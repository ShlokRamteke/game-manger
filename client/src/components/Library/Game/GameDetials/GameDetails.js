import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { updateGame, deleteGame } from "../../../../api/index.js";
import _ from "lodash";

import {
  Container,
  Grid,
  Paper,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Button,
  Fab,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";

import { Alert, AlertTitle } from "@mui/material";

//Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel.js";
import CloudUploadIcon from "@mui/icons-material/CloudUpload.js";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever.js";

// Get single game details
import { getGame } from "../../../../api/index.js";

import { useStyles } from "./styles";

const GameDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useNavigate();
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
      console.log("Files");
      setGame({ ...game, [e.target.name]: base64 });
      return;
    }
    console.log(e.target.name, e.target.value);
    setGame({ ...game, [e.target.name]: e.target.value });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
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
    //redirect to library
    history("/games");
  };

  //Submit game update form and call utility functions
  const handleUpdateGame = async (e) => {
    e.preventDefault();

    const res = await updateGame(game, id);
    console.log(res);

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

  //Display a confirmation alert after user submits form
  const confirmationAlert = (status) => {
    switch (status) {
      case 200:
        return (
          <Alert
            className={classes.alert}
            severity="success"
            onClose={() =>
              toggleConfirmationDialog() && window.location.reload()
            }
          >
            <AlertTitle>success</AlertTitle>
            Game details have been updated!
          </Alert>
        );
      case 500:
      case 403:
      case 404:
      case 405:
      case 409:
      case 410:
        return (
          <Alert
            className={classes.alert}
            severity="error"
            onClose={() => toggleConfirmationDialog()}
          >
            <AlertTitle> Error</AlertTitle>
            Something went wrong! Please check your inputs and try again.
          </Alert>
        );
      default:
        return (
          <Alert
            className={classes.alert}
            severity="success"
            onClose={() =>
              toggleConfirmationDialog() && window.location.reload()
            }
          >
            <AlertTitle>success</AlertTitle>
            Game details have been updated!
          </Alert>
        );
    }
  };

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
            <Divider className={classes.divider} />
            <CardContent className={classes.cardContent}>
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
              <Typography variant="h4" component="h2">
                {game?.title}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="p">
                Release Date: {game?.releaseDate}
              </Typography>
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
              </CardActions>
            </CardContent>
          </Card>
        </Paper>
      </Container>
      {/* *********** GAME EDIT FORM ************ */}
      <Dialog open={editForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Manage Game:</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Use the inputs below to edit the game. When you're finished, press
            the save button to upload the changes to the library.
          </DialogContentText>
          <Divider variant="middle" style={{ marginBottom: "10px" }} />
          <form>
            {/* Title */}
            <TextField
              autoFocus
              margin="dense"
              name="title"
              id="title"
              label="Game Title"
              type="text"
              defaultValue={game?.title}
              onChange={handleFormChange}
              fullWidth
            />
            {/* Description */}
            <TextField
              margin="dense"
              name="description"
              id="description"
              label="Description"
              type="text"
              defaultValue={game?.description}
              onChange={handleFormChange}
              fullWidth
            />
            {/* Release Date */}
            <TextField
              margin="dense"
              name="releaseDate"
              id="releaseDate"
              label="Release Date"
              type="text"
              defaultValue={game?.releaseDate}
              onChange={handleFormChange}
              helperText="Format: June 30, 2021"
              fullWidth
            />
            {/* Cover Art */}
            <input
              accept="image/*"
              name="coverArt"
              id="coverArt"
              onChange={handleFormChange}
              type="file"
              style={{ display: "none" }}
            />
            <label htmlFor="coverArt">
              <Button
                style={{ marginTop: "20px" }}
                variant="contained"
                color="secondary"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload Cover Art
              </Button>
            </label>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={toggleEditForm}
            color="primary"
            variant="outlined"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteGame}
            color="secondary"
            variant="contained"
            startIcon={<DeleteForeverIcon />}
          >
            Delete Game
          </Button>
          <Button
            onClick={handleUpdateGame}
            color="primary"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Form Confirmation dialog */}
      <Dialog open={confirmation} aria-describedby="alert-dialog-description">
        <DialogContent style={{ padding: "0" }}>
          {confirmation && confirmationAlert(alertStatus)}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameDetails;
