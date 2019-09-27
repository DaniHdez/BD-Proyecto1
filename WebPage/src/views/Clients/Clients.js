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

import { Clients } from "variables/general.js";

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

export default function TableList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handlePopClickCancel = () => {
    //setOpen(false);
    setOpen2(true);
  };

  const handlePopClickAccept = () => {
    var name = document.getElementById("name").value;
    var lastname1 = document.getElementById("lastname1").value;
    var lastname2 = document.getElementById("lastname2").value;
    var id = document.getElementById("id").value;
    var accountNumber = document.getElementById("accountNumber").value;
    var phone = document.getElementById("cellphone").value;
    var province = document.getElementById("province").value;
    if (
      name != "" &&
      lastname1 != "" &&
      lastname2 != "" &&
      id != "" &&
      accountNumber != "" &&
      phone != "" &&
      province != ""
    ) {
      ////////////////////////////////////////////////////////////
      //Aca se deb pasar los datos escritos en el form, a la api//
      ////////////////////////////////////////////////////////////
      setOpen(false);
    } else {
      window.alert("Debe llenar todos los campos");
      setOpen(true);
    }
  };

  const handleReturnConfirmation = () => {
    setOpen2(false);
  };

  const handleAcceptConfirmation = () => {
    setOpen2(false);
    setOpen(false);
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
        <DialogTitle id="form-dialog-title">Agregar cliente</DialogTitle>
        <DialogContent>
          <DialogContentText>Datos requeridos para cliente</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Nombre"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="lastname1"
            label="Apellido"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="lastname2"
            label="Apellido"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="id"
            label="Cédula"
            type="id"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="accountNumber"
            label="Número de cuenta"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="cellphone"
            label="Teléfono"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="province"
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
      <Dialog
        open2={open2}
        onClose={handleAcceptConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Seguro que desea cancelar?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si cancela los datos del nuevo cliente se perderán.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReturnConfirmation} color="primary">
            Volver
          </Button>
          <Button onClick={handleAcceptConfirmation} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
  );
}
