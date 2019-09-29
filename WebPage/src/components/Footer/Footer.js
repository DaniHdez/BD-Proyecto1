/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <p className={classes.right}>
          <span>
            <a className={classes.a}>
              Bases de datos avanzadas Castrillo.A, Gamboa.S, Hernández.D,
              Solis.D, Creative Tim template
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
