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
    database: 'Farmacia',
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

server.post("/Users/AddNewUser", async (req, res) => {
    //Data Base config
    
    let name = req.param("Nombre");
    //console.log("name")
    //console.log(name);
    let lastName = req.param("Apellido");
    //console.log("lasname");
    //console.log(lastName);
    let ced = req.param("Cedula");
    //console.log("ced");
    //console.log(ced);
    //Encrypt
    //let pass =  CryptoJS.AES.encrypt(req.body["Password"], 'zWqhtuy567lKhtgf3');

    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Nombre', sql.VarChar(100), name)
            .input('Apellido', sql.VarChar(100), lastName)
            .input('Cedula', sql.VarChar(100), ced)
            .execute('adduser')
        
        sql.close();
        success = {"Succes": "True", "Result": result2["output"]["Status"]};
    }
    catch(err)
    {
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });

 server.post("/Usuarios/Login", async (req, res) => {
    let user = req.param("Nombre_Usuario");
    let pass = req.body("Contraseña");

    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('Nombre_Usuario', sql.VarChar(100), user)
            .output('Contraseña', sql.VarChar(256))
            .execute('Login_SP')
        sql.close();

        result2["output"]["Password"].toString();
        //var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        if(result2 === pass)
        {
            success = {"Succes": "True"};
        }
        else
        {
            success = {"Succes": "False"};
        }     
    }
    catch(err)
    {
        success = {"Succes": "False"};
        console.log(err);
    }
    res.send(success);
 });

 server.get("/Medicamentos/Inventario", async (req, res) => {

    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .execute('SP_getinventario')
        
        sql.close();
        //success = {"Succes": "True", "Result": result2["output"]["Status"]};
        var success = parse(result2);
        
        //success = result2
    }
    catch(err)
    {
        success = {"Succes": "False", "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });
 server.listen(port, ()=> console.log(`Listening on port ${port}`))