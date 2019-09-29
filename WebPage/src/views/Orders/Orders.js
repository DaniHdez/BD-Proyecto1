import "date-fns";
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
// Popup
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import {
  Orders,
  clientsH,
  orderState,
  orderType,
  medicines
} from "variables/general.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

export default function TableList() {
  const classes = useStyles();

  const [open, setOpen, open2, setOpen2] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handlePopClickCancel = () => {
    setOpen(false);
  };

  const handlePopClickAccept = () => {
    setOpen(false);
  };

  const [values, setValues] = React.useState({
    currency: ""
  });
  const [valuesS, setValuesS] = React.useState({
    currencyS: ""
  });
  const [valuesT, setValuesT] = React.useState({
    currencyT: ""
  });
  const [valuesM, setValuesM] = React.useState({
    currencyM: ""
  });

  const handleChangeC = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeS = name => event => {
    setValuesS({ ...valuesS, [name]: event.target.value });
  };

  const handleChangeT = name => event => {
    setValuesT({ ...valuesT, [name]: event.target.value });
  };

  const handleChangeM = name => event => {
    setValuesM({ ...valuesM, [name]: event.target.value });
  };

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const [state, setState] = React.useState({
    columns: [
      { title: "Tipo", field: "type" },
      { title: "Fecha", field: "date" },
      { title: "Cliente", field: "client" },
      { title: "Estado", field: "state" },
      { title: "Detalle", field: "datail" }
    ],
    data: Orders
  });

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Pedidos</h4>
          </CardHeader>
          <CardBody>
            <MaterialTable
              title="Historial"
              columns={state.columns}
              data={state.data}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const data = [...state.data];
                      data[data.indexOf(oldData)] = newData;
                      setState({ ...state, data });
                    }, 600);
                  }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const data = [...state.data];
                      data.splice(data.indexOf(oldData), 1);
                      setState({ ...state, data });
                    }, 600);
                  })
              }}
            />
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fab}
              onClick={handleClick}
            >
              <AddIcon />
            </Fab>
          </CardBody>
        </Card>
      </GridItem>
      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar pedido</DialogTitle>
        <DialogContent>
          <DialogContentText>Datos requeridos para pedido</DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date"
                label="Fecha del pedido"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <TextField
            id="standard-select-currency"
            select
            label="Cliente"
            className={classes.textField}
            value={values.currency}
            onChange={handleChangeC("currency")}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Seleccione un cliente"
            margin="normal"
          >
            {clientsH.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            label="Estado"
            className={classes.textField}
            value={valuesS.currencyS}
            onChange={handleChangeS("currencyS")}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Seleccione un estado"
            margin="normal"
          >
            {orderState.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            label="Tipo de pedido"
            className={classes.textField}
            value={valuesT.currencyT}
            onChange={handleChangeT("currencyT")}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Seleccione un tipo"
            margin="normal"
          >
            {orderType.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            label="Medicamentos"
            className={classes.textField}
            value={valuesM.currencyM}
            onChange={handleChangeM("currencyM")}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Seleccione un medicamento"
            margin="normal"
          >
            {medicines.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            id="pay"
            label="Monto a pagar"
            name="username"
            autoComplete="username"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopClickCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handlePopClickAccept} color="primary">
            Añadir
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
  );
}
