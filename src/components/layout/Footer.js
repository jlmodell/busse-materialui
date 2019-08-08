import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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

const Footer = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed" className={classes.footer}>
        <Typography className={classes.copyright}>&copy; 2019</Typography>
      </AppBar>
    </div>
  );
};

export default Footer;
