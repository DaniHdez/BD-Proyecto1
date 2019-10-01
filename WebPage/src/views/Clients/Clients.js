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
// Popup
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import * as API from "variables/handleClient";


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

const useStyles = makeStyles(styles);

export default function TableClients() {
  const classes = useStyles();
  console.log("Holis")
  var Clients = [];
  API.get_clients(Clients)
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handlePopClickCancel = () => {
    setOpen(false);
  };

  const handlePopClickAccept = () => {
    var name = document.getElementById("clientName").value;
    var lastname1 = document.getElementById("clientLastname1").value;
    var lastname2 = document.getElementById("clientLastname2").value;
    var id = document.getElementById("clientId").value;
    var accountNumber = document.getElementById("clientAccountNumber").value;
    var phone = document.getElementById("clientCellphone").value;
    var province = document.getElementById("clientProvince").value;
    if (
      name != "" &&
      lastname1 != "" &&
      lastname2 != "" &&
      id != "" &&
      accountNumber != "" &&
      phone != "" &&
      province != ""
    ) {

      API.create_client(name, lastname1, lastname2, id, phone, province);    
       
      ////////////////////////////////////////////////////////////
      //Aca se deb pasar los datos escritos en el form, a la api//
      ////////////////////////////////////////////////////////////
      setOpen(false);
    } else {
      window.alert("Debe llenar todos los campos");
      setOpen(true);
    }
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Clientes</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Nombre", "Apellido", "Categoría"]}
              tableData={Clients}
            />
            <div class="fab">
              <Fab
                color="secondary"
                aria-label="add"
                className={classes.fab}
                onClick={handleClick}
              >
                <AddIcon />
              </Fab>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar cliente</DialogTitle>
        <DialogContent>
          <DialogContentText>Datos requeridos para cliente</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="clientName"
            label="Nombre"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="clientLastname1"
            label="Apellido"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="clientLastname2"
            label="Apellido"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="clientId"
            label="Cédula"
            type="id"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="clientAccountNumber"
            label="Número de cuenta"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="clientCellphone"
            label="Teléfono"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="clientProvince"
            label="Provincia de residencia"
            fullWidth
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
