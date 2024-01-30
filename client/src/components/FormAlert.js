import React from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";

//Diaolog box for game forms
const FormAlert = ({
  confirmation,
  alertStatus,
  toggleConfirmationDialog,
  classes,
  getGameDetails,
}) => {
  const history = useNavigate();

  //Display a confirmation alert after user submits form
  const confirmationAlert = (status) => {
    switch (status) {
      //Successful game update
      case 200:
        return (
          <Alert
            className={classes.alert}
            severity="success"
            varient="filled"
            onClose={() => {
              toggleConfirmationDialog();
              getGameDetails && getGameDetails();
            }}
          >
            <AlertTitle>Success</AlertTitle>
            Game Details have been updated
          </Alert>
        );
      //Successful game creation
      case 201:
        return (
          <Alert
            className={classes.alert}
            severity="success"
            varient="filled"
            onClose={() => {
              toggleConfirmationDialog();
              window.location.reload();
            }}
          >
            <AlertTitle> Success</AlertTitle>Game has been uploaded
          </Alert>
        );
      // Successful game deletion
      case 202:
        return (
          <Alert
            className={classes.alert}
            severity="success"
            variant="filled"
            onClose={() => {
              toggleConfirmationDialog();
              // Redirect user to library
              history.push("/games");
            }}
          >
            <AlertTitle>Success</AlertTitle>
            Game details have been updated!
          </Alert>
        );
      // Handle errors
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
            variant="filled"
            onClose={() => toggleConfirmationDialog()}
          >
            <AlertTitle>Error</AlertTitle>
            Something went wrong! Please check your inputs and try again.
          </Alert>
        );
      default:
        return (
          <Alert
            className={classes.alert}
            severity="success"
            variant="filled"
            onClose={() => {
              toggleConfirmationDialog();
              getGameDetails();
            }}
          >
            <AlertTitle>Success</AlertTitle>
            Game details have been updated!
          </Alert>
        );
    }
  };

  return (
    <Dialog open={confirmation} aria-describedby="alert-dialog-description">
      <DialogContent style={{ padding: "0" }}>
        {confirmation && confirmationAlert(alertStatus)}
      </DialogContent>
    </Dialog>
  );
};

export default FormAlert;
