import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
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

//import { Medicines } from "variables/general.js";
import * as API from "variables/handleMeds";


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
  var Medicines = []
  //API.get_meds(Medicines);
  // ######################## 
  // LLAMAR AL API POR DATOS
  // GET ALL PEDIDOS(MEDICINES)
  // ######################## 

  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({
    multiline: ""
  });

  const [state, setState] = React.useState({
    columns: [
      { title: "Nombre", field: "name" },
      { title: "Marca", field: "brand" },
      { title: "Tipo", field: "type" },
      { title: "Foto", field: "photo" },
      { title: "Precio", field: "price" },
      { title: "Cantidad", field: "quantity" }
    ],
    data: Medicines
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handlePopClickCancel = () => {
    setOpen(false);
  };

  const handlePopClickAccept = () => {
    console.log("HOLIS POP CLICK ACCEPT")
    setOpen(false);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Medicamentos</h4>
            <p className={classes.cardCategoryWhite}>
              Medicamentos disponibles para la venta
            </p>
          </CardHeader>
          <CardBody>
            <MaterialTable
              title="Disponible"
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
        <Dialog
          open={open}
          onClose={handleClick}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Agregar medicamento</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Datos requeridos para medicamentos
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="medicineName"
              label="Nombre"
              type="name"
              fullWidth
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="medicineBrand"
              label="Marca"
              type="name"
              fullWidth
            />
            <TextField
              required
              id="medicineDescription"
              label="Descripción"
              multiline
              rowsMax="4"
              value={values.multiline}
              onChange={handleChange("multiline")}
              className={classes.textField}
              margin="normal"
              fullWidth
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="medicineType"
              label="Tipo"
              type="name"
              fullWidth
            />
            <TextField
              required
              id="medicineDoseI"
              label="Dosis para niños"
              multiline
              rowsMax="4"
              value={values.multiline}
              onChange={handleChange("multiline")}
              className={classes.textField}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="medicineDoseA"
              label="Dosis para adultos"
              multiline
              rowsMax="4"
              value={values.multiline}
              onChange={handleChange("multiline")}
              className={classes.textField}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="sideEffects"
              label="Efectos secundarios"
              multiline
              rowsMax="4"
              value={values.multiline}
              onChange={handleChange("multiline")}
              className={classes.textField}
              margin="normal"
              fullWidth
            />
            {/* Foto */}
            <TextField
              autoFocus
              required
              margin="dense"
              id="medicinePrice"
              label="Price"
              type="money"
              fullWidth
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="medicineQuantity"
              label="Cantidad"
              type="numerical"
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
      </GridItem>
    </GridContainer>
  );
}
