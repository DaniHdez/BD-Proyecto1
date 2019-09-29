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

import { AdminSucursal } from "variables/general.js";

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

export default function TableAdminSucursal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handlePopClickCancel = () => {
    setOpen(false);
  };

  const handlePopClickAccept = () => {
    var name = document.getElementById("adminName").value;
    var lastname1 = document.getElementById("adminLastname1").value;
    var lastname2 = document.getElementById("adminLastname2").value;
    var sucursal = document.getElementById("adminSucursal").value;
    if (name != "" && lastname1 != "" && lastname2 != "" && sucursal != "") {
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
            <h4 className={classes.cardTitleWhite}>Administradores</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Nombre", "Apellido", "Sucursal"]}
              tableData={AdminSucursal}
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
        <DialogTitle id="form-dialog-title">Agregar administrador</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Datos requeridos para administrador
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="adminName"
            label="Nombre"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="adminLastname1"
            label="Apellido"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="adminLastname2"
            label="Apellido"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="adminSucursal"
            label="Sucursal"
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
