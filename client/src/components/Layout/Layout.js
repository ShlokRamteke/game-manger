import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

//API Calls
import { addGame, getAllGames } from "../../api/index.js";

//Classname utility for creating conditonal classes
import clsx from "clsx";
import {
  Container,
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
  Button,
  Menu,
  MenuItem,
  Link,
  InputBase,
  CircularProgress,
} from "@mui/material";

//Custom Form Components
import GameForm from "../GameForm.js";
import FormAlert from "../FormAlert.js";
import { convertToBase64 } from "../FileToBase64.js";

//Icons
import MenuIcon from "@mui/icons-material/Menu";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from "@mui/icons-material/Search.js";
import ClearIcon from "@mui/icons-material/Clear.js";

import { useStyles } from "./styles.js";

import Logo from "../../game-console-bg.svg";

import Library from "../Library/Library.js";

const Layout = () => {
  const classes = useStyles();
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [newGame, setNewGame] = useState({
    title: "",
    description: "",
    coverArt: "",
    releaseDate: "",
  });

  const [games, setGames] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const searchInput = useRef(null);

  // Handle account menu functionality
  const [accountMenu, setAccountMenu] = useState(null);
  const openAccountMenu = (e) => {
    setAccountMenu(e.currentTarget);
  };

  const closeAccountMenu = () => {
    setAccountMenu(null);
  };

  // Handle game upload menu
  const [uploadForm, setUploadForm] = useState(false);
  const toggleUploadForm = () => setUploadForm(!uploadForm);

  //Handle user logout
  const logout = () => {
    history("/");
    //Remove token from storage
    localStorage.clear();
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

  //Handle form change for new game
  const handleFormChange = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const base64 = await convertToBase64(file);
      console.log(base64);
      setNewGame({ ...newGame, [e.target.name]: base64 });
      return;
    }
    console.log(e.target.name, e.target.value);
    setNewGame({ ...newGame, [e.target.name]: e.target.value });
  };

  const handleNewGame = async (e) => {
    e.preventDefault();

    const res = await addGame(newGame);

    //Clear input fields
    setNewGame({
      title: "",
      description: "",
      coverArt: "",
      releaseDate: "",
    });

    //Close Dialog box
    setAlertStatus(res.status);
    toggleConfirmationDialog();
    toggleUploadForm();
  };
  // Handle form confirmation
  const [alertStatus, setAlertStatus] = useState(200);
  const [confirmation, setConfirmation] = useState(false);
  const toggleConfirmationDialog = () => setConfirmation(!confirmation);

  //Fetch and set games
  const handleGames = async () => {
    const { data } = await getAllGames();

    await setGames(data);
    await setSearchList(data);
    await setIsLoading(false);
  };

  const searchGames = (e) => {
    //IF query field is empty, reset search
    if (!e.target.value) return setSearchList(games);

    const query = e.target.value.toUpperCase();

    //Search for the specified games (case insensitive)
    setSearchList(
      games.filter((game) => game.title.toUpperCase().includes(query))
    );
  };

  //Fetch games on initial load

  useEffect(() => {
    document.title = "Library | Game Manager";
    handleGames();
  }, []);

  //Watch for changes to the viewport
  useEffect(() => {
    window.addEventListener("resize", handleWidthChange);
    //Toggle viewport on smaller screens
    if (width <= 768) {
      handleDrawerClose();
    } else {
      handleDrawerOpen();
    }

    return () => window.removeEventListener("resize", handleWidthChange);
  }, [width]);

  return (
    <div className={classes.root}>
      {/* Top nav */}
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
          {/*Title & Logo*/}
          <Typography variant="h6" component="h1" className={classes.title}>
            <img src={Logo} className={classes.logo} alt="Game Console logo" />
            My Game Library
          </Typography>
          <Button
            variant="contained"
            onClick={openAccountMenu}
            color="secondary"
            className={classes.button}
            startIcon={<SportsEsportsIcon />}
          >
            {width >= 370 && "My Account"}
          </Button>
          {/* **** USER ACCOUNT ***** */}
          <Menu
            id="simple-menu"
            anchorEl={accountMenu}
            keepMounted
            open={Boolean(accountMenu)}
            onClose={closeAccountMenu}
          >
            {/*<MenuItem onClick={closeAccountMenu}>Profile</MenuItem>*/}
            <MenuItem onClick={logout}>
              Logout <ExitToAppIcon />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {/* ****** Sidenav ****** */}
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
          <ListItem
            button
            style={{ paddingLeft: "18px" }}
            onClick={toggleUploadForm}
          >
            <ListItemIcon>
              {/* Upload game */}
              <CloudUploadIcon color="primary" style={{ fontSize: "2.2rem" }} />
            </ListItemIcon>
            <ListItemText primary="Upload new game" />
          </ListItem>
        </List>
        <Divider />
        {/* Search bar */}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search by Name"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputRef={searchInput}
            id="searchInput"
            inputProps={{ "aria-label": "search" }}
            autoComplete="off"
            onChange={searchGames}
          />
          <div className={classes.clearIcon}>
            {/* Display once user begins typing */}
            {searchInput.current?.value !== "" && (
              <ClearIcon /*REsets the search field*/
                onClick={() => {
                  document.getElementById("searchInput").value = "";
                  setSearchList(games);
                }}
              />
            )}
          </div>
        </div>
        {/* Games list */}
        <List style={{ padding: " 10px" }}>
          <Typography>Games ({searchList?.length})</Typography>
          {searchList?.length > 0 ? (
            searchList?.map((game, index) => (
              <ListItem key={index}>
                <Link component={RouterLink} to={`/games/${game._id}`}>
                  {game.title}
                </Link>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText>No Games Found</ListItemText>
            </ListItem>
          )}
        </List>
      </Drawer>
      {/* Main content of page */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          {/* Render the passed component */}
          {isLoading ? <CircularProgress /> : <Library games={games} />}
        </Container>
      </main>
      {/* *********** GAME UPLOAD FORM ************ */}
      <GameForm
        isNewGame={true}
        isFormOpen={uploadForm}
        toggleForm={toggleUploadForm}
        handleFormChange={handleFormChange}
        handleGame={handleNewGame}
      />
      {/* Form Conformation dialog box*/}
      <FormAlert
        confirmation={confirmation}
        toggleConfirmationDialog={toggleConfirmationDialog}
        alertStatus={alertStatus}
      />
    </div>
  );
};

export default Layout;
