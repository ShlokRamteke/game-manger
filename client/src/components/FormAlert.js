import React from "react";
import { Dialog, DialogContent } from "@mui/material";

//Diaolog box for game forms
const FormAlert = ({ confirmation, confirmationAlert, alertStatus }) => {
  return (
    <Dialog open={confirmation} aria-describedby="alert-dialog-description">
      <DialogContent style={{ padding: "0" }}>
        {confirmation && confirmationAlert(alertStatus)}
      </DialogContent>
    </Dialog>
  );
};

export default FormAlert;
