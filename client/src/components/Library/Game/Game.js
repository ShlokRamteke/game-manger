import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

//Icons
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";

//File uploader
import FileBase from "react-file-base64";

import { useStyles } from "../styles.js";

const Game = ({ game }) => {
  const classes = useStyles();
  const { id, title, coverArt, description } = game;
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleUpdateGame = (e) => {};

  const handleFileInput = (file) => {
    //Supported image formats
    const types = ["image/jpeg", "/image/jpg", "/image/png"];
    console.log(file);

    //Handle empty file
    if (!file) return alert("Empty file input, Try again");
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4} xl={6}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title={title}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h4" component="h2">
              {title}
            </Typography>
            <Typography component="p">{description}</Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/games/${id}`}
              endIcon={<LaunchIcon />}
            >
              View Details
            </Button>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<EditIcon />}
              onClick={handleEditForm}
            >
              Edit
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Dialog
        open={showEditForm}
        onClose={handleEditForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Game Details:</DialogTitle>
        <DialogContent component="form">
          <DialogContentText>
            Use the following controls to quickly edit or delete the game.
          </DialogContentText>
          {/* Title */}
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Update Title"
            placeholder="Halo 3"
            type="text"
            fullWidth
          />
          {/* Description */}
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Update Description"
            placeholder="Halo 3 is an excellent game."
            type="text"
            fullWidth
            helperText="Max 250 characters."
          />
          {/* Release Date */}
          <TextField
            margin="dense"
            id="releaseDate"
            name="releaseDate"
            label="Update Release Date"
            placeholder="September 25, 2007"
            type="text"
            fullWidth
            helperText="Format: MM-DD-YYYY"
          />
          {/* Cover art */}
          <div style={{ marginTop: "10px" }}>
            <Typography
              variant="body2"
              style={{ marginBottom: "8px", color: "grey" }}
            >
              Update Cover Art:
            </Typography>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => handleFileInput(base64)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditForm}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>

          <Button
            onClick={handleEditForm}
            variant="outlined"
            color="primary"
            startIcon={<DeleteForeverIcon />}
          >
            Delete Game
          </Button>
          <Button
            onClick={handleEditForm}
            variant="outlined"
            color="primary"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Game;
