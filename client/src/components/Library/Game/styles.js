import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  card: {
    backgroundColor: "red",
    color: (props) => props.color,
  },
});
