import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signin } from "../../api";

import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { Alert, AlertTitle } from "@mui/material";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import { useStyles } from "./styles";

const Home = () => {
  //Hooks
  const classes = useStyles();
  const history = useNavigate();

  //State
  const [signIn, setSignIn] = useState({
    username: "GamerGuy16",
    password: "",
    error: "false",
    errorMessage: {},
  });
  const [showHint, setShowHint] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  //Handle alert Box
  const toggleConfirmationDialog = () => setConfirmation(!confirmation);

  //Handle Sign in
  const handleFormChange = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  };
  const validateSignIn = (data) => {
    let isError = false;

    //Username is incorrect
    if (data.username) {
      isError = true;
      setSignIn({
        ...signIn,
        error: true,
        errorMessage: {
          username: data.message,
        },
      });
      //Password is incorrect
    } else if (data.password) {
      isError = true;
      setSignIn({
        ...signIn,
        error: true,
        errorMessage: {
          password: data.message,
        },
      });
    }
    //Handle other errors
    else if (data.message) {
      isError = true;
      return (
        <Alert
          className={classes.alert}
          severity="error"
          varient="filled"
          onClose={() => toggleConfirmationDialog()}
        >
          <AlertTitle>Error</AlertTitle>
          {data.message}
        </Alert>
      );
    }
    return isError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await signin(signIn);
    const isError = validateSignIn(data);

    //Throw Error
    if (isError) return;

    /*if (!data.token)
      return alert("Sorry, your username or password is incorrect.");
    */
    const token = data.token;

    localStorage.setItem("token", token);
    history("/games");
  };

  useEffect(() => {
    document.title = "Sign In | Game Manager";
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SportsEsportsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to Game Library Manager
            <Typography component="h2" varient="subtitle1">
              {" "}
              Please Sign In to continue
            </Typography>
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              error={!!signIn.errorMessage.username}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              helperText={
                signIn.errorMessage.username && signIn.errorMessage.username
              }
              defaultValue="GamerGuy16"
              autoComplete="username"
              type="text"
              onChange={handleFormChange}
            />
            <TextField
              error={!!signIn.errorMessage.password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              helperText={
                signIn.errorMessage.password && signIn.errorMessage.password
              }
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              onChange={handleFormChange}
            />

            <Button
              disabled={
                signIn.username.length === 0 || signIn.password.length === 0
              }
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to="#"
                  variant="body2"
                  onClick={() => setShowHint(!showHint)}
                >
                  {showHint
                    ? "Here are your credentials:"
                    : "Forgot your password?"}
                </Link>
                <div
                  style={{
                    display: `${showHint ? "block" : "none"}`,
                  }}
                >
                  <p>
                    Username: <span style={{ color: "blue" }}>GamerGuy16</span>
                  </p>
                  <p>
                    Password:{" "}
                    <span style={{ color: "blue" }}>gameManager123</span>
                  </p>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
