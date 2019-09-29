import React from "react";
import "date-fns";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ButtonFilter from "@material-ui/core/Button";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { borderRight } from "@material-ui/system";
import { Clients, month, orderType } from "variables/local.js";
import { TextField, Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

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

export default function TableClients() {
  const classes = useStyles();

  const [valuesS, setValuesS] = React.useState({
    currencyS: ""
  });
  const [valuesT, setValuesT] = React.useState({
    currencyT: ""
  });

  const handleChangeS = name => event => {
    setValuesS({ ...valuesS, [name]: event.target.value });
  };

  const handleChangeT = name => event => {
    setValuesT({ ...valuesT, [name]: event.target.value });
  };

  //Controla el boton de filtrar deberia validar si hay datos en los dos date picker
  function handleFilter() {}

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <h4>Pedidos de la sucursal</h4>
          </CardHeader>
          <CardBody>
            <Card>
              <div class="date">
                <TextField
                  id="selectType"
                  select
                  label="Tipo"
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
                  id="selectMonth"
                  select
                  label="Mes"
                  className={classes.textField}
                  value={valuesS.currencyS}
                  onChange={handleChangeS("currencyS")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  helperText="Seleccione un mes"
                  margin="normal"
                >
                  {month.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <ButtonFilter variant="outlined" onClick={handleFilter()}>
                  Filtrar
                </ButtonFilter>
              </div>
            </Card>
            <Table
              tableHeaderColor="rose"
              tableHead={["Código", "Tipo", "Estado", "Fecha"]}
              tableData={Clients}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
