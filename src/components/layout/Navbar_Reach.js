import React, { useState } from "react";
import { connect } from "react-redux";
import { observer } from "mobx-react";
import { Link } from "@reach/router";

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
import {
  Money,
  Menu,
  Home,
  AccountBalance,
  PieChart
} from "@material-ui/icons";

import { logout } from "../../store/actions";

import { users } from "../../testing/store/mobx_users";

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

const NavBar = observer(props => {
  const classes = useStyles();
  const store = users;

  const [state, setState] = useState({
    drawer: false
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => setState({ ...state, drawer: !state.drawer })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">Busse</Typography>
          <Typography className={classes.title} variant="h6">
            Hospital Disposables
          </Typography>
          {!localStorage.getItem("token") || !store.token ? (
            <Hidden xsDown>
              <Button
                variant="contained"
                className={classes.button}
                component={Link}
                to="/login"
              >
                Login
              </Button>
            </Hidden>
          ) : (
            <Hidden xsDown>
              <Button
                variant="contained"
                component={Link}
                to="/"
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
          {!localStorage.getItem("token") || !store.token ? (
            <Hidden xsDown>
              <Button
                disabled="true"
                variant="contained"
                className={classes.button}
                component={Link}
                to="/register"
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
        <div className={classes.list} role="presentation">
          <List>
            {[
              { icon: <Home />, text: "Home", path: "/" },
              {
                icon: <Money />,
                text: "Customer Sales Analysis",
                path: "/sales"
              },
              {
                icon: <AccountBalance />,
                text: "Item Sales Analysis",
                path: "/items"
              },
              {
                icon: <PieChart />,
                text: "Time Series by Item Tool",
                path: "/itemreview"
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

          {!localStorage.getItem("token") || !store.token ? (
            <Button
              fullWidth
              variant="contained"
              component={Link}
              to="/login"
              className={classes.button}
              onClick={() => setState({ ...state, drawer: !state.drawer })}
            >
              Login
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              component={Link}
              to="/register"
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
          {!localStorage.getItem("token") || !store.token ? (
            <Button
              disabled="true"
              fullWidth
              variant="contained"
              component={Link}
              to="/register"
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
});

const mapStateToProps = state => {
  return { state };
};

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
