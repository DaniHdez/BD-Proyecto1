import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignInSide() {
  const classes = useStyles();

  function validate(username, password) {
    //Buscar en base de datos si existe retur True, si no return false
    return true;
  }

  function IniciarSesion() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "" && password === "") {
      window.alert("Debe completar los datos");
    } else if (username !== "" && password === "") {
      window.alert("Debe escribir su contraseña");
    } else if (username === "" && password !== "") {
      window.alert("Debe escribir un nombre de usuario");
    } else {
      var validUser = validate(username, password);
      if (validUser === true) {
        // Llamar al api y pedir el rol
        // Hacer validación
        //if (userRol==="admin"){window.location.href="/admin/dashboard"}
        //else if (userRol==="client"){window.location.href="/client/dashboard"}
        //else if (userRol==="adminsucursal"){window.location.href="/adminsucursal/dashboard"}
        //else (userRol==="employee"){window.location.href="/employee/dashboard"}
        window.location.href = "/local/dashboard";
      } else {
        window.alert("Usuario o contraseña invalidos");
      }
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicia sesión
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              onClick={IniciarSesion}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"No tienes una cuenta? Regístrate"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
