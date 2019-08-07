import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontWeight: 200
  },
  button: {
    color: "white",
    backgroundColor: "teal"
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  footer: {
    top: "auto",
    bottom: 0
  },
  copyright: {
    display: "flex",
    justifyContent: "center",
    padding: ".5rem 0"
  }
}));

export function NavBar() {
  const classes = useStyles();

  const [state, setState] = useState({
    left: false
  });

  const toggleDrawer = (side, open) => e => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {[
          { icon: <HomeIcon />, text: "Home", path: "Home" },
          {
            icon: <AccountBalanceIcon />,
            text: "Customer Sales Analysis",
            path: "/sales"
          },
          {
            icon: <AccountBalanceIcon />,
            text: "Item Sales Analysis",
            path: "/items"
          },
          {
            icon: <AccountBalanceIcon />,
            text: "Pricing Tool",
            path: "/prices"
          }
        ].map((t, i) => (
          <ListItem button key={i} component={NavLink} to={t.path}>
            <ListItemIcon>{t.icon}</ListItemIcon>
            <ListItemText>{t.text}</ListItemText>
          </ListItem>
        ))}
      </List>

      <Button fullWidth variant='contained' className={classes.button}>
        Login
      </Button>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
          >
            <MenuIcon onClick={toggleDrawer("left", true)} />
          </IconButton>
          <Typography variant='h6'>Busse</Typography>
          <Typography className={classes.title} variant='h6'>
            Hospital Disposables
          </Typography>
          <Button
            variant='contained'
            className={classes.button}
            component={NavLink}
            to='/login'
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}

export function Footer() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position='fixed' className={classes.footer}>
        <Typography className={classes.copyright}>&copy; 2019</Typography>
      </AppBar>
    </div>
  );
}
