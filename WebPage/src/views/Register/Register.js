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
import { province } from "variables/register.js";
import MenuItem from "@material-ui/core/MenuItem";

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
  },
  textField: {
    marginRight: theme.spacing(4)
  }
}));

export default function RegisterSide() {
  const classes = useStyles();
  const [valuesP, setValuesP] = React.useState({
    currencyP: ""
  });
  const handleChangeP = name => event => {
    setValuesP({ ...valuesP, [name]: event.target.value });
  };

  function Register() {}

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
            Registrate
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre"
              name="username"
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Apellidos"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="identification"
              label="Número de cédula"
              autoFocus
              className={classes.textField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="accountNumber"
              label="Número de cuenta"
              autoFocus
              className={classes.textField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="cellphone"
              label="Número de telefono"
              autoFocus
              className={classes.textField}
            />
            <TextField
              required
              id="provincia"
              variant="outlined"
              select
              label="Provincia"
              className={classes.textField}
              value={valuesP.currencyP}
              onChange={handleChangeP("currencyP")}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Seleccione una provinicia"
              margin="normal"
            >
              {province.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="password"
              type="password"
              label="Contraseña"
              name="password"
              autoFocus
              className={classes.textField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="passwordConfirmation"
              type="password"
              label="Confirmar contraseña"
              name="password"
              autoFocus
              className={classes.textField}
            />
            <Button
              onClick={Register}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Ya tienes cuenta? Inicia sesión"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
