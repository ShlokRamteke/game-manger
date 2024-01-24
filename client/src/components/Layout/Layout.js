import React, { useState, useEffect } from "react";
import { Link as NavLink, useNavigate } from "react-router-dom";

//Classname utility for creating conditonal classes
import clsx from "clsx";
import {
  Container,
  Grid,
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Link,
  Avatar,
} from "@mui/material";

//Icons
import MenuIcon from "@mui/icons-material/Menu";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import GamesIcon from "@mui/icons-material/Games";

import { useStyles } from "./styles.js";

import Library from "../Library/Library.js";

const Layout = ({ Content }) => {
  const classes = useStyles();
  const history = useNavigate();

  //Handle user logout
  const logout = () => {
    history("/");
  };

  //Handle Navbar
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //Store current size of viewport window
  const [width, setWidth] = useState(window.innerWidth);
  const handleWidthChange = () => {
    setWidth(window.innerWidth);
  };

  //Watch for changes to the viewport
  useEffect(() => {
    window.addEventListener("resize", handleWidthChange);
    //Toggle viewport on smaller screens
    if (width <= 650) {
      handleDrawerClose();
    } else {
      handleDrawerOpen();
    }

    return () => window.removeEventListener("resize", handleWidthChange);
  }, [width]);

  return (
    <div className={classes.root}>
      {/* Top nav*/}
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" className={classes.title}>
            Game Library
          </Typography>

          <IconButton color="inherit" onClick={() => logout()}>
            <ExitToAppIcon />
            <Typography variant="body2"> Sign Out</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      {/*Sidenav*/}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {/* Main menu list */}
        <List>
          <ListItem>
            <ListItemIcon>
              {/* User avatar */}
              <GamesIcon />
            </ListItemIcon>
            <ListItemText primary="Games" />
          </ListItem>
        </List>
        <Divider />
        {/* Account/Settings */}
        <List>
          <ListItem button component={NavLink} to="/account">
            <ListItemIcon>
              {/* User avatar */}
              <Avatar className={classes.avatar}>
                <SportsEsportsIcon />{" "}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="My Account" />
          </ListItem>
        </List>
      </Drawer>
      {/* Content of page */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* Render the passed component */}
          <Grid container spacing={4}>
            <Grid item sm={12}>
              <Library />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Layout;
