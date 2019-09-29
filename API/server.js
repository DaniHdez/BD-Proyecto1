const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const port = 8080;
const sql = require('mssql');
//var CryptoJS = require("crypto-js");

server.use(bodyParser.json());

//CORS Middleware
server.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
//Setting up server
/*var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });
*/
let config = {
    user: 'sa',
    password:'asd',
    server: 'localhost', 
    port:64403,
    database: 'FarmaTEC',
    //options: {
    //    instancename: 'MSSQLSERVER01'
        //encrypt: false
    //} 
};

/**    
// Decrypt
var bytes  = CryptoJS.AES.decrypt(pass.toString(), 'zWqhtuy567lKhtgf3');
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
console.log(plaintext);
**/

server.get("/Pedidos/CantidadDePedidosEnRango", async (req, res) => {
    let FechaInicial= req.body["FechaInicial"];
    let FechaFinal = req.body["FechaFinal"];
    var Date1 = new Date(FechaInicial);
    var Date2 = new Date(FechaFinal);
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('FechaInicial', sql.DateTime, Date1)
            .input('FechaFinal', sql.DateTime,Date2)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_CantidadDePedidosEnRango')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });

server.get("/Usuarios/GetCliente", async (req, res) => {
    let Cedula= req.body["Cedula"];
    
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('CedulaCliente', sql.BigInt, Cedula)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_Cliente')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });

server.get("/Sucursal/GetDineroRecaudadoEnSucursal", async (req, res) => {
    let ID= req.body["ID"];
    
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Id', sql.Int, ID)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_DineroRecaudadoEnSucursal')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });
 
 
 
 server.get("/Sucursal/GetDineroRecaudadoEnSucursal_NFK", async (req, res) => {
    let Farmacia= req.body["Farmacia"];
    
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Farmacia', sql.Int, Farmacia)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_DineroRecaudadoEnSucursal_sin_fk')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 }); 
 
 server.get("/Montos/GetMontoEnFarmaciaSegunTipoDePedido", async (req, res) => {
    let IDFarmacia= req.body["IdFarmacia"];
    let Tipo= req.body["Tipo"]
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('IdFarmacia', sql.Int, IDFarmacia)
            .input('Tipo',sql.Int, Tipo)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_MontoEnFarmaciaSegunTipoDePedido')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 }); 

 server.get("/Montos/GetMontoParaTipoDePedido", async (req, res) => {
    let FechaInicial= req.body["FechaInicial"];
    let FechaFinal= req.body["FechaFinal"];
    let Tipo= req.body["Tipo"]
    var Date1 = new Date(FechaInicial);
    var Date2 = new Date(FechaFinal);
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('FechaInicial',sql.DateTime, Date1)
            .input('FechaFinal',sql.DateTime,Date2)
            .input('Tipo',sql.Int, Tipo)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_MontoParaTipoDePedido')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 }); 

 server.get("/Montos/GETMontoPromedioXCadaClienteEnRango", async (req, res) => {
    let FechaInicial= req.body["FechaInicial"];
    let FechaFinal= req.body["FechaFinal"];
    var Date1 = new Date(FechaInicial);
    var Date2 = new Date(FechaFinal);
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('FechaInicial',sql.DateTime, Date1)
            .input('FechaFinal',sql.DateTime,Date2)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_MontoPromedioXCadaClienteEnRango')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });


 server.get("/Montos/GETMontoPromedioXClientesEnRango", async (req, res) => {
    let FechaInicial= req.body["FechaInicial"];
    let FechaFinal= req.body["FechaFinal"];
    var Date1 = new Date(FechaInicial);
    var Date2 = new Date(FechaFinal);
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('FechaInicial',sql.DateTime, Date1)
            .input('FechaFinal',sql.DateTime,Date2)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_MontoPromedioXClientesEnRango')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });
 
 server.get("/Pedidos/GETPedidosEnRango", async (req, res) => {
    let FechaInicial= req.body["FechaInicial"];
    let FechaFinal= req.body["FechaFinal"];
    var Date1 = new Date(FechaInicial);
    var Date2 = new Date(FechaFinal);
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('FechaInicial',sql.DateTime, Date1)
            .input('FechaFinal',sql.DateTime,Date2)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_PedidosEnRango')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });

 server.get("/Clientes/GETTopClientes", async (req, res) => {
    let FechaInicial= req.body["FechaInicial"];
    let FechaFinal= req.body["FechaFinal"];
    var Date1 = new Date(FechaInicial);
    var Date2 = new Date(FechaFinal);
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('FechaInicial',sql.DateTime, Date1)
            .input('FechaFinal',sql.DateTime,Date2)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_TopClientes')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });

 server.post("/Usuarios/POSTCliente", async (req, res) => {
    let Cedula = req.body["Cedula"];
    let Nombre = req.body["Nombre"];
    let Apellido1 = req.body['Apellido1'];
    let Apellido2 = req.body['Apellido2'];
    let Telefono = req.body['Telefono'];
    let Tipo = req.body['Tipo'];
    let IdProvincia = req.body['IdProvincia'];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Nombre', sql.VarChar(256), Nombre)
            .input('Apellido1', sql.VarChar(256), Apellido1)
            .input('Apellido2', sql.VarChar(256), Apellido2)
            .input('Cedula', sql.BIGINT, Cedula)
            .input('Telefono', sql.BIGINT, Telefono)
            .input('Tipo', sql.INT, Tipo)
            .input('IdProvincia', sql.INT, IdProvincia)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Cliente')
        sql.close();

        //result2["output"]["Password"].toString();
        //var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });

 server.post("/Usuarios/POSTCliente_NFK", async (req, res) => {
    let Cedula = req.body["Cedula"];
    let Nombre = req.body["Nombre"];
    let Apellido1 = req.body['Apellido1'];
    let Apellido2 = req.body['Apellido2'];
    let Telefono = req.body['Telefono'];
    let Tipo = req.body['Tipo'];
    let Provincia = req.body['Provincia'];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Nombre', sql.VarChar(256), Nombre)
            .input('Apellido1', sql.VarChar(256), Apellido1)
            .input('Apellido2', sql.VarChar(256), Apellido2)
            .input('Cedula', sql.BIGINT, Cedula)
            .input('Telefono', sql.BIGINT, Telefono)
            .input('Tipo', sql.INT, Tipo)
            .input('Provincia', sql.VarChar(256), Provincia)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Cliente_sin_fk')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });
 
 server.post("/Usuarios/POSTEmpleado", async (req, res) => {
    let Contraseña = req.body["Contraseña"];
    let Nombre = req.body["Nombre"];
    let Apellido1 = req.body['Apellido1'];
    let Apellido2 = req.body['Apellido2'];
    let Tipo = req.body['Tipo'];
    let Correo = req.body['Correo'];
    let Estado = req.body['Estado'];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Nombre', sql.VarChar(256), Nombre)
            .input('Apellido1', sql.VarChar(256), Apellido1)
            .input('Apellido2', sql.VarChar(256), Apellido2)
            .input('Contraseña', sql.VarChar(256), Contraseña)
            .input('Tipo', sql.INT, Tipo)
            .input('Correo', sql.VarChar(256), Correo)
            .input('Estado',sql.Bit,Estado)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Empleado')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });

//--------------------Preguntarle a Alejandra sobre el tipo de dato de Ubicación--------
 server.post("/Farmacias/POSTFarmacia", async (req, res) => {
    let Nombre = req.body["Nombre"];
    let Correo = req.body['Correo'];
    let CedJuridica = req.body['CedJuridica'];
    let Ubicacion = req.body['Ubicacion'];
    let Telefono = req.body['Telefono'];
    let Horario = req.body['Horario'];
    let TotalRecaudado = req.body['TotalRecaudado'];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Nombre', sql.VarChar(256), Nombre)
            .input('CedJuridica', sql.BigInt, CedJuridica)
            .input('Correo', sql.VarChar(256), Correo)
            .input('Ubicacion', sql.VarChar(256), Ubicacion)
            .input('Telefono', sql.BigInt, Telefono)
            .input('Horario', sql.VarChar(256), Horario)
            .input('TotalRecaudado', sql.Money, TotalRecaudado)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Farmacia')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });


 server.post("/Farmacias/POSTFarmaciaxMedicamento", async (req, res) => {
    let IdFarmacia = req.body["IdFarmacia"];
    let IdMedicamento = req.body["IdMedicamento"];
    let Stock = req.body["Stock"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('IdFarmacia', sql.Int, IdFarmacia)
            .input('IdMedicamento', sql.Int, IdMedicamento)
            .input('Stock', sql.Int, Stock)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_FarmaciaXMedicamento')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });
 server.post("/Farmacias/POSTFarmaciaxMedicamento_NFK", async (req, res) => {
    let Farmacia = req.body["Farmacia"];
    let Medicamento = req.body["Medicamento"];
    let Stock = req.body["Stock"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Farmacia', sql.Int, Farmacia)
            .input('Medicamento', sql.Int, Medicamento)
            .input('Stock', sql.Int, Stock)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_FarmaciaXMedicamento_sin_fk')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });

 server.post("/Medicamentos/POSTMarca", async (req, res) => {
    let Nombre = req.body["Nombre"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Nombre', sql.VarChar(256), Nombre)
            
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Marca')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });

 server.post("/Medicamentos/POSTMedicamento", async (req, res) => {
    let Nombre = req.body["Nombre"];
    let Descripcion = req.body["Descripcion"];
    let DosisNinos = req.body["DosisNinos"];
    let DosisAdultos = req.body["DosisAdultos"];
    let EfectosSecundarios = req.body["EfectosSecundarios"];
    let Foto = req.body["Foto"];
    let Precio = req.body["Precio"];
    let Tipo = req.body["Tipo"];
    let IdMarca = req.body["IdMarca"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Nombre', sql.VarChar(256), Nombre)
            .input('Descripcion', sql.VarChar(256), Descripcion)
            .input('DosisAdultos',sql.VarChar(256),DosisAdultos)
            .input('DosisNinos', sql.VarChar(256), DosisNinos)
            .input('EfectosSecundarios', sql.VarChar(256), EfectosSecundarios)
            .input('Foto', sql.Image, Foto) //Recomendar cambiar a varbinary(max)
            .input('Precio', sql.Money, Precio)
            .input('Tipo', sql.int, Tipo)
            .input('IdMarca', sql.int, IdMarca)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Medicamento')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });


 server.post("/Medicamentos/POSTMedicamento_NFK", async (req, res) => {
    let Nombre = req.body["Nombre"];
    let Descripcion = req.body["Descripcion"];
    let DosisNinos = req.body["DosisNinos"];
    let DosisAdultos = req.body["DosisAdultos"];
    let EfectosSecundarios = req.body["EfectosSecundarios"];
    let Foto = req.body["Foto"];
    let Precio = req.body["Precio"];
    let Tipo = req.body["Tipo"];
    let Marca = req.body["Marca"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Nombre', sql.VarChar(256), Nombre)
            .input('Descripcion', sql.VarChar(256), Descripcion)
            .input('DosisNinos', sql.VarChar(256), DosisNinos)
            .input('DosisAdultos', sql.VarChar(256), DosisAdultos)
            .input('EfectosSecundarios', sql.VarChar(256), EfectosSecundarios)
            .input('Foto', sql.Image, Foto) //Recomendar cambiar a varbinary(max)
            .input('Precio', sql.Money, Precio)
            .input('Tipo', sql.int, Tipo)
            .input('Marca', sql.int, Marca)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Medicamento_sin_fk')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });

 server.post("/Pedidos/POSTPedido", async (req, res) => {
    let Fecha = req.body["Fecha"];
    let Estado = req.body["Estado"];
    let Monto = req.body["Monto"];
    let Tipo = req.body["Tipo"];
    let IdCliente = req.body["IdCliente"];
    let IdFarmacia = req.body["IdFarmacia"];

    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Fecha', sql.DateTime, Fecha)
            .input('Estado', sql.int, Estado)
            .input('Monto', sql.Money, Monto)
            .input('Tipo', sql.Int, Tipo)
            .input('IdCliente', sql.Int, IdCliente)
            .input('IdFarmacia', sql.INT, IdFarmacia)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Pedido')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });

 server.post("/Pedidos/POSTPedido_NFK", async (req, res) => {
    let Fecha = req.body["Fecha"];
    let Estado = req.body["Estado"];
    let Monto = req.body["Monto"];
    let Tipo = req.body["Tipo"];
    let Cliente = req.body["CedulaCliente"];
    let Farmacia = req.body["Farmacia"];

    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Fecha', sql.DateTime, Fecha)
            .input('Estado', sql.int, Estado)
            .input('Monto', sql.Money, Monto)
            .input('Tipo', sql.Int, Tipo)
            .input('CedulaCliente', sql.Int, Cliente)
            .input('Farmacia', sql.INT, Farmacia)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Pedido_sin_fk')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });
 
 server.post("/Pedidos/POSTPedidoXMedicamento", async (req, res) => {
    let Cantidad = req.body["Cantidad"];
    let IdPedido = req.body["IdPedido"];
    let IdMedicamento = req.body["IdMedicamento"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Cantidad', sql.Int, Cantidad)
            .input('IdPedido', sql.Int, IdPedido)
            .input('IdMedicamento', sql.INT, IdMedicamento)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_PedidoXMedicamento')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });
 
 server.post("/Pedidos/POSTPedidoXMedicamento_NFK", async (req, res) => {
    let Cantidad = req.body["Cantidad"];
    let IdPedido = req.body["IdPedido"];
    let Medicamento = req.body["Medicamento"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Cantidad', sql.Int, Cantidad)
            .input('IdPedido', sql.Int, IdPedido)
            .input('Medicamento', sql.INT, Medicamento)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_PedidoXMedicamento_sin_fk')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });
 
server.post("/Provincias/POSTProvincia", async (req, res) => {
    //let Nombre = req.body[Name];
    let Nombre = req.body["Nombre"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Nombre', sql.VarChar(256), Nombre)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Provincia')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });
server.post("/Pedidos/UPDATEEstadoPedido", async (req, res) => {
    let IdPedido = req.body["IdPedido"];
    let Estado = req.body["Estado"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('IdPedido', sql.int, IdPedido)
            .input('Estado', sql.int, Estado)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_update_EstadoPedido')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });
 

 server.post("/Pedidos/UPDATEMontoFarmacia", async (req, res) => {
    let IdFarmacia = req.body["IdFarmacia"];
    let Monto = req.body["Monto"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('IdFarmacia', sql.int, IdFarmacia)
            .input('Monto', sql.Money, Monto)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_update_MontoFarmacia')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });
 
 server.listen(port, ()=> console.log(`Listening on port ${port}`))
 

 /**
  * COMPLETED API STORED PROCEDURES
  * -----------------------GET-----------------------
  * GET sp_get_CantidadDePedidosEnRango             *
  * GET sp_get_Cliente                              *
  * GET sp_get_DineroRecaudadoEnSucursal            *
  * GET sp_get_DineroRecaudadoEnSucursal_sin_fk     *
  * GET sp_get_MontoEnFarmaciaSegunTipoDePedido     *
  * GET sp_get_MontoParaTipoDePedido                *
  * GET sp_get_MontoPromedioXCadaClienteEnRango     *
  * GET sp_get_MontoPromedioXClientesEnRango        *
  * GET sp_get_PedidosEnRango                       *
  * GET sp_get_TopClientes                          *
  * -----------------------POST----------------------
  * POST sp_push_Cliente                            *
  * POST sp_push_Cliente_sin_fk                     *
  * POST sp_push_Empleado                           *
  * POST sp_push_Farmacia                           * //Preguntarle a Alejandra sobre el tipo de dato de Ubicación--------
  * POST sp_push_FarmaciaXMedicamento               *
  * POST sp_push_FarmaciaXMedicamento_sin_fk        *
  * POST sp_push_Marca                              *
  * POST sp_push_Medicamento                        * //Recomendar cambiar image a varbinary(max)
  * POST sp_push_Medicamento_sin_fk                 * //Recomendar cambiar image a varbinary(max)
  * POST sp_push_Pedido                             *
  * POST sp_push_Pedido_sin_fk                      *
  * POST sp_push_PedidoXMedicamento                 *
  * POST sp_push_PedidoXMedicamento_sin_fk          *
  * POST sp_push_Provincia                          *
  * POST sp_update_EstadoPedido                     *
  * POST sp_update_MontoFarmacia                    *
  */