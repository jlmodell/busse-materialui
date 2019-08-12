import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
  ListItemText,
  Hidden
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import { logout } from "../../store/actions";

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

const NavBar = props => {
  const classes = useStyles();

  const [state, setState] = useState({
    drawer: false
  });

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            onClick={() => setState({ ...state, drawer: !state.drawer })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>Busse</Typography>
          <Typography className={classes.title} variant='h6'>
            Hospital Disposables
          </Typography>
          {!props.state.user.token ? (
            <Hidden xsDown>
              <Button
                variant='contained'
                className={classes.button}
                component={Link}
                to='/login'
              >
                Login
              </Button>
            </Hidden>
          ) : (
            <Hidden xsDown>
              <Button
                variant='contained'
                component={Link}
                to='/'
                className={classes.button}
                onClick={() => {
                  localStorage.clear();
                  props.logout();
                }}
              >
                Logout
              </Button>
            </Hidden>
          )}
          {!props.state.user.token ? (
            <Hidden xsDown>
              <Button
                variant='contained'
                className={classes.button}
                component={Link}
                to='/register'
              >
                Register
              </Button>
            </Hidden>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        open={state.drawer}
        onClose={() => setState({ ...state, drawer: !state.drawer })}
      >
        <div className={classes.list} role='presentation'>
          <List>
            {[
              { icon: <HomeIcon />, text: "Home", path: "/" },
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
              <ListItem
                button
                key={i}
                component={Link}
                to={t.path}
                onClick={() => setState({ ...state, drawer: !state.drawer })}
              >
                <ListItemIcon>{t.icon}</ListItemIcon>
                <ListItemText>{t.text}</ListItemText>
              </ListItem>
            ))}
          </List>

          {!props.state.user.token ? (
            <Button
              fullWidth
              variant='contained'
              component={Link}
              to='/login'
              className={classes.button}
              onClick={() => setState({ ...state, drawer: !state.drawer })}
            >
              Login
            </Button>
          ) : (
            <Button
              fullWidth
              variant='contained'
              component={Link}
              to='/register'
              className={classes.button}
              onClick={() => {
                localStorage.clear();
                props.logout();
                setState({ ...state, drawer: !state.drawer });
              }}
            >
              Logout
            </Button>
          )}
          {!props.state.user.token ? (
            <Button
              fullWidth
              variant='contained'
              component={Link}
              to='/register'
              className={classes.button}
              onClick={() => setState({ ...state, drawer: !state.drawer })}
            >
              Register
            </Button>
          ) : (
            ""
          )}
        </div>
      </Drawer>
    </div>
  );
};

const mapStateToProps = state => {
  return { state };
};

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
