import React from "react";
import "date-fns";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

import { Clients } from "variables/local.js";

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
  button: {
    margin: theme.spacing(1)
  },
  textField: { margin: theme.spacing(1) }
}));

export default function TableClients() {
  const classes = useStyles();

  function handleFilter() {
    var fechaInicial = document.getElementById("inidate").value;
    var fechaFinal = document.getElementById("findate").value;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4>Tabla de clientes:</h4>
            <div class="fab">
              <TextField
                variant="outlined"
                margin="normal"
                id="inidate"
                label="Fecha de inicio"
                type="date"
                defaultValue="mm/dd/yyyy"
                className={classes.textField}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="findate"
                label="Fecha final"
                type="date"
                defaultValue="mm/dd/yyyy"
                className={classes.textField}
              />
              <Button className={classes.button} onClick={handleFilter}>
                Filtrar
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="rose"
              tableHead={[
                "Nombre",
                "Apellido",
                "Categoría",
                "Monto promedio",
                "Total de pedidos"
              ]}
              tableData={Clients}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
