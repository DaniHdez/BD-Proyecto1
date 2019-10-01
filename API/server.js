const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const port = 8080;
const sql = require('mssql');
//var CryptoJS = require("crypto-js");
server.use(bodyParser.urlencoded({extended: false}))
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
    password:'paso1234',
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

server.post("/Pedidos/sp_delete_PedidoXMedicamento", async (req, res) => {
    
    let CodigoPedido= req.body["CodigoPedido"];
    let CodigoMedicamento = req.body["CodigoMedicamento"];
    
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('CodigoDePedido', sql.VarChar(256), CodigoPedido)
            .input('CodigoDeMedicamento', sql.VarChar(256),CodigoMedicamento)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_delete_PedidoXMedicamento')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });

 


server.post("/Pedidos/CantidadDePedidosEnRango", async (req, res) => {
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
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });

server.post("/Usuarios/GetCliente", async (req, res) => {
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
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });

server.post("/Sucursal/GetDineroRecaudadoEnSucursal", async (req, res) => {
    let CedJuridica= req.body["CedJuridica"];
    
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('CedJuridica', sql.BigInt, CedJuridica)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_DineroRecaudadoEnSucursal')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });
 
 server.post("/Sucursal/GetDineroRecaudadoEnSucursal_Todas", async (req, res) => {
    let CedJuridica1= req.body["CedJuridica1"];
    let CedJuridica2= req.body["CedJuridica2"];
    let CedJuridica3= req.body["CedJuridica3"];
    
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('CedJuridica', sql.BigInt, CedJuridica1)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_DineroRecaudadoEnSucursal')
        sql.close();
        let pool2 = await sql.connect(config);
        let result3 = await pool2.request()
            .input('CedJuridica', sql.BigInt, CedJuridica2)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_DineroRecaudadoEnSucursal')
        sql.close();
        let pool3 = await sql.connect(config);
        let result4 = await pool3.request()
            .input('CedJuridica', sql.BigInt, CedJuridica3)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_DineroRecaudadoEnSucursal')
        sql.close();
        success = {"Succes": "True", "Result1": result2, "Result2": result3, "Result3": result4};

    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });


 
 server.post("/Sucursal/GetDineroRecaudadoEnSucursal_NFK", async (req, res) => {
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
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 }); 
 
 server.post("/Empleado/GETEmpleado", async (req, res) => {
    let Correo = req.body["Correo"];
    
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Correo', sql.VarChar(256), Correo)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_Empleado')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
    
 }); 

 server.post("/Farmacias/GETFarmacia", async (req, res) => {
    let CedJuridica = req.body["CedJuridica"];
    
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('CedJuridica', sql.VarChar(256), CedJuridica)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_Farmacia')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 }); 

 server.post("/Montos/MontoRecaudadoPorSucursal", async (req, res) => {
    let CedJuridica= req.body["CedJuridica"];
    let Tipo= req.body["Tipo"];
    let Tipo2=req.body["Tipo2"];
    console.log("Holy fuck");
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('CedJuridica', sql.BigInt, CedJuridica)
            .input('Tipo',sql.Int, Tipo)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_MontoEnFarmaciaSegunTipoDePedido')
        sql.close();
        let pool2 = await sql.connect(config);
        let result3 = await pool2.request()
            .input('CedJuridica', sql.BigInt, CedJuridica)
            .input('Tipo',sql.Int, Tipo2)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_MontoEnFarmaciaSegunTipoDePedido')
        
        console.log("Before Closing");
        sql.close();
        console.log("After Closing");
        success = {"Succes": "True", "Result_Tipo1": result2, "Result_Tipo2":result3};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result_Tipo1": err, "Result_Tipo2": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
    console.log(success)
 }); 

 
 server.post("/Montos/GetMontoEnFarmaciaSegunTipoDePedido", async (req, res) => {
    let CedJuridica= req.body["CedJuridica"];
    let Tipo= req.body["Tipo"]
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('CedJuridica', sql.BigInt, CedJuridica)
            .input('Tipo',sql.Int, Tipo)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_MontoEnFarmaciaSegunTipoDePedido')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 }); 

 server.post("/Montos/GetMontoGeneral", async (req, res) => {
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_MontoGeneral')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 }); 
 
 server.post("/Montos/GetMontoParaTipoDePedido_ambos", async (req, res) => {
    let FechaInicial= req.body["FechaInicial"];
    let FechaFinal= req.body["FechaFinal"];
    let Tipo1= req.body["Tipo1"];
    let Tipo2= req.body["Tipo2"];
    var Date1 = new Date(FechaInicial);
    var Date2 = new Date(FechaFinal);
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('FechaInicial',sql.DateTime, Date1)
            .input('FechaFinal',sql.DateTime,Date2)
            .input('Tipo',sql.Int, Tipo1)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_MontoParaTipoDePedido')
        sql.close();
        let pool2 = await sql.connect(config);
        let result3 = await pool2.request()
            .input('FechaInicial',sql.DateTime, Date1)
            .input('FechaFinal',sql.DateTime,Date2)
            .input('Tipo',sql.Int, Tipo2)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_MontoParaTipoDePedido')
        sql.close();
        success = {"Succes": "True", "Result1": result2, "Result2": result3};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 }); 


 server.post("/Montos/GetMontoParaTipoDePedido", async (req, res) => {
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
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 }); 

 server.post("/Montos/GETMontoPromedioXCadaClienteEnRango", async (req, res) => {
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
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });


 server.post("/Montos/GETMontoPromedioXClientesEnRango", async (req, res) => {
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
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });
 
 server.post("/Pedidos/GETPedido", async (req, res) => {
    let CodigoDePedido= req.body["CodigoDePedido"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('CodigoDePedido',sql.VarChar(256), CodigoDePedido)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_Pedido')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });

 
server.post("/Pedidos/GETPedidosEnRango", async (req, res) => {
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
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
 });

 server.post("/Pedidos/GETPedidosXClienteEnRango", async (req, res) => {
    let FechaInicial= req.body["FechaInicial"];
    let FechaFinal= req.body["FechaFinal"];
    let CedulaCliente = req.body["CedulaCliente"];
    var Date1 = new Date(FechaInicial);
    var Date2 = new Date(FechaFinal);
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('FechaInicial',sql.DateTime, Date1)
            .input('FechaFinal',sql.DateTime,Date2)
            .input('CedulaCliente0',sql.BigInt,CedulaCliente)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_PedidosXClienteEnRango')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
 });
 

 server.post("/Clientes/GETTopClientes", async (req, res) => {

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
        sql.close();
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });

 
 server.post("/Clientes/GETTotalClientes", async (req, res) => {
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_TotalClientes')
        sql.close();
        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });




 server.post("/Usuarios/POSTCliente_CFK", async (req, res) => {
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
        sql.close();
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
            .execute('sp_push_Cliente')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
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
    let CedJuridica = req.body['CedJuridica'];

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
            .input('CedJuridica', sql.BigInt, CedJuridica)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Empleado')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
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
    let PuntoA = req.body['PuntoA'];
    let PuntoB = req.body['PuntoB'];
    let Telefono = req.body['Telefono'];
    let Horario = req.body['Horario'];
    let TotalRecaudado = req.body['TotalRecaudado'];
    let Provincia = req.body['Provincia'];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Nombre', sql.VarChar(256), Nombre)
            .input('CedJuridica', sql.BigInt, CedJuridica)
            .input('Correo', sql.VarChar(256), Correo)
            .input('PuntoA', sql.VarChar(256), PuntoA)
            .input('PuntoB', sql.VarChar(256), PuntoB)
            .input('Telefono', sql.BigInt, Telefono)
            .input('Horario', sql.VarChar(256), Horario)
            .input('TotalRecaudado', sql.Money, TotalRecaudado)
            .input('Provincia',sql.VarChar(256),Provincia)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Farmacia')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
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
        sql.close();
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
        sql.close();
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
        sql.close();
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });

//  #### 
server.post("/Medicamentos/POSTMedicamento", async (req, res) => {
    let Nombre = req.body["Nombre"];
    let Descripcion = req.body["Descripcion"];
    let DosisNinos = req.body["DosisNinos"];
    let DosisAdultos = req.body["DosisAdultos"];
    let EfectosSecundarios = req.body["EfectosSecundarios"];
    let Foto = req.body["Foto"];
    let Precio = req.body["Precio"];
    let Tipo = req.body["Tipo"];
    let Marca = req.body["Marca"];
    let CodigoDeMedicamento = req.body["CodigoDeMedicamento"];
    let Farmacia = req.body["Farmacia"];
    let Stock = req.body["Stock"];
    let success;
    var Img = Buffer.from(Foto);
    try
    {
        let pool = await sql.connect(config);
        console.log("HOLI");
        let result2 = await pool.request()
            .input('Nombre', sql.VarChar(256), Nombre)
            .input('Descripcion', sql.VarChar(256), Descripcion)
            .input('DosisNinos', sql.VarChar(256), DosisNinos)
            .input('DosisAdultos', sql.VarChar(256), DosisAdultos)
            .input('EfectosSecundarios', sql.VarChar(256), EfectosSecundarios)
            .input('Foto', sql.VarBinary(256), Img) //Recomendar cambiar a varbinary(max)
            .input('Precio', sql.Money, Precio)
            .input('Tipo', sql.VarChar(256), Tipo)
            .input('Marca', sql.VarChar(256), Marca)
            .input('CodigoDeMedicamento', sql.VarChar(256), CodigoDeMedicamento)
            .input()
            .execute('sp_push_Medicamento')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
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
            .input('Foto', sql.VarBinary, Foto) //Recomendar cambiar a varbinary(max)
            .input('Precio', sql.Money, Precio)
            .input('Tipo', sql.int, Tipo)
            .input('Marca', sql.int, Marca)
            .input('CedJuridica', sql.VarChar(256),Farmacia)
            .input('Stock', sql.VarChar(256), Stock)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Medicamento_sin_fk')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
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
    let CedulaCliente = req.body["CedulaCliente"];
    let CedJuridica = req.body["CedulaJuridica"];
    let CodigoPedido = req.body["CodigoPedido"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Fecha', sql.DateTime, Fecha)
            .input('Estado', sql.int, Estado)
            .input('Monto', sql.Money, Monto)
            .input('Tipo', sql.Int, Tipo)
            .input('CedulaCliente', sql.BigInt, CedulaCliente)
            .input('CedJuridica', sql.BigInt, CedJuridica)
            .input('CodigoPedido', sql.BigInt, CodigoPedido)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_Pedido')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
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
        sql.close();
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });
 
 server.post("/Pedidos/POSTPedidoXMedicamento", async (req, res) => {
    let Cantidad = req.body["Cantidad"];
    let CodigoPedido = req.body["CodigoPedido"];
    let CodigoDeMedicamento = req.body["CodigoDeMedicamento"];
    let CedJuridicaFarmacia = req.body["CedJuridicaFarmacia"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Cantidad', sql.Int, Cantidad)
            .input('CodigoPedido', sql.VarChar(256), CodigoPedido)
            .input('CodigoDeMedicamento', sql.VarChar(256), CodigoDeMedicamento)
            .input('CedJuridicaFarmacia', sql.BigInt, CedJuridicaFarmacia)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_push_PedidoXMedicamento')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
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
        sql.close();
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
        sql.close();
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });

 
 server.post("/Pedidos/UPDATECantidadDeMedicamentoEnPedido", async (req, res) => {
    //let Nombre = req.body[Name];
    let CodigoDePedido = req.body["CodigoDePedido"];
    let CodigoDeMedicamento = req.body["CodigoDeMedicamento"];
    let Cantidad = req.body["Cantidad"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('CodigoDePedido', sql.VarChar(256), CodigoDePedido)
            .input('CodigoDeMedicamento', sql.VarChar(256), CodigoDeMedicamento)
            .input('Cantidad', sql.Int, Cantidad)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_update_CantidadDeMedicamentoEnPedido')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
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
        sql.close();
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });
 
 server.post("/Farmacias/UPDATEFarmaciaXMedicamento_NFK", async (req, res) => {
    let CedJuridica = req.body["CedJuridica"];
    let CodigoDeMedicamento = req.body["CodigoDeMedicamento"];
    let Stock = req.body["Stock"]
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('CedJuridica', sql.bigint, CedJuridica)
            .input('CodigoDeMedicamento', sql.VarChar, CodigoDeMedicamento)
            .input('Stock',sql.int,Stock)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_update_FarmaciaXMedicamento_sin_fk')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });
 
 
server.post("/Pedidos/UPDATEMontoFarmacia", async (req, res) => {
    let CedulaJuridica = req.body["CedulaJuridica"];
    let Monto = req.body["Monto"];
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('CedulaJuridica', sql.int, CedulaJuridica)
            .input('Monto', sql.Money, Monto)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_update_MontoFarmacia')
        sql.close();

        success = {"Succes": "True", "Result": result2};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False", "Result":err};
        console.log(err);
    }
    res.send(success);
 });
 

//  #### CREADOS POR SANTI #### ///
 server.get("/clientes/all", async (req, res) => {
     let result;
     try
     {
         let pool = await sql.connect(config);
         let query = await pool.request()
            .execute('sp_getall_clientes')
        sql.close()
        result = {"Succes": "True", "Result":query.recordset}
     }
     catch (error) {
        sql.close()
        result = {"Succes":"False", "Result":error}
        console.log(error) 
     }
     res.send(result);
 });

 server.get("/medicamentos/all", async (req, res) => {
    let result;
    try
    {
        let pool = await sql.connect(config);
        let query = await pool.request()
           .execute('sp_get_AllMedicametos')
       sql.close()
       result = {"Succes": "True", "Result":query.recordset}
    }
    catch (error) {
       sql.close()
       result = {"Succes":"False", "Result":error}
       console.log(error) 
    }
    res.send(result);
});

server.get("/pedidos/all", async(req, res) =>{
    let result;
    try {
        let pool = await sql.connect(config);
        let query = await pool.request()
            .execute('sp_get_AllPedidos')
        sql.close()
        result = {"Succes":"True", Result:query.recordset}
    } catch (error) {
        result = {"Succes":"False", Result:error}
    }
    res.send(result)
});

 //  #### CREADOS POR DANI #### ///
 server.post("/monto/montosucursalrango", async (req, res) => {

    let FechaInicial= req.body["FechaInicial"];
    let FechaFinal= req.body["FechaFinal"];
    let CedJuridica = req.body["CedJuridica"];
    var Date1 = new Date(FechaInicial);
    var Date2 = new Date(FechaFinal);
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('FechaInicial',sql.DateTime, Date1)
            .input('FechaFinal',sql.DateTime,Date2)
            .input('CedJuridica',sql.VarChar(256), CedJuridica)
            //.output('Contraseña', sql.VarChar(256))
            .execute('sp_get_MontoEnSucursalXRango')
        sql.close();
        success = {"Succes": "True", "Result": result2.recordset[0][""]};
    }
    catch(err)
    {
        sql.close();
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
  * POST sp_push_Farmacia                           * //Cambiado a dos Varchar: PuntoA y Punto B
  * POST sp_push_FarmaciaXMedicamento               *
  * POST sp_push_FarmaciaXMedicamento_sin_fk        *
  * POST sp_push_Marca                              *
  * POST sp_push_Medicamento                        * //Cammbiado a varbinary como se deseaba
  * POST sp_push_Medicamento_sin_fk                 * //Cambiado a varbinary como se deseaba
  * POST sp_push_Pedido                             *
  * POST sp_push_Pedido_sin_fk                      *
  * POST sp_push_PedidoXMedicamento                 *
  * POST sp_push_PedidoXMedicamento_sin_fk          *
  * POST sp_push_Provincia                          *
  * POST sp_update_EstadoPedido                     *
  * POST sp_update_MontoFarmacia                    *
  * -------------------------------------------------
  * DELETE sp_delete_PedidoXMedicamento             *
  * 
  * 
  * AÑADIR ESTOS SP:
  * AÑadir FULL_PEDIDO
  * AÑadir PEDIDOS_DE_CLIENTE
  * 
  */