/*****************************************/
/********** STORE PROCEDURES  ************/
/*****************************************/

USE FarmaTEC
GO

/***************** PUSH ******************/

/* Marca */
CREATE PROCEDURE sp_push_Marca
	@Nombre VARCHAR(MAX)
AS
BEGIN
	INSERT INTO Marca(Nombre) VALUES (@Nombre)
END
GO
/* Provincia */
CREATE PROCEDURE sp_push_Provincia
	@Nombre VARCHAR(MAX)
AS
BEGIN
	INSERT INTO Provincia(Nombre) VALUES (@Nombre)
END
GO
/* Farmacia*/
CREATE PROCEDURE sp_push_Farmacia
	@Nombre VARCHAR(MAX),
	@CedJuridica BIGINT,
	@Ubicacion VARCHAR(MAX),
	@Telefono BIGINT,
	@Correo VARCHAR(MAX),
	@Horario VARCHAR(MAX),
	@TotalRecaudado MONEY
AS
BEGIN
	INSERT INTO Farmacia (Nombre,CedJuridica,Ubicacion,Telefono,Correo,Horario,TotalRecaudado)  
	VALUES (@Nombre,@CedJuridica,@Ubicacion,@Telefono,@Correo,@Horario,@TotalRecaudado)
END
GO
/* Empleado */
CREATE PROCEDURE sp_push_Empleado
	@Nombre VARCHAR(MAX),
	@Apellido1 VARCHAR(MAX),
	@Apellido2 VARCHAR(MAX),
	@Tipo INT,
	@Estado BIT,
	@Correo VARCHAR(MAX),
	@Contraseña VARCHAR(MAX)
AS
BEGIN
	INSERT INTO Empleado(Nombre,Apellido1,Apellido2,Tipo,Estado,Correo,Contraseña)  
	VALUES (@Nombre,@Apellido1,@Apellido2,@Tipo,@Estado,@Correo,@Contraseña)
END
GO
/* Cliente */
CREATE PROCEDURE sp_push_Cliente
	@Cedula BIGINT,
	@Nombre VARCHAR(MAX),
	@Apellido1 VARCHAR(MAX),
	@Apellido2 VARCHAR(MAX),
	@Telefono BIGINT,
	@Tipo INT,
	@IdProvincia INT
AS
BEGIN
	INSERT INTO Cliente(Cedula,Nombre,Apellido1,Apellido2,Telefono,Tipo,IdProvincia)
	VALUES (@Cedula,@Nombre,@Apellido1,@Apellido2,@Telefono,@Tipo,@IdProvincia)
END
GO
CREATE PROCEDURE sp_push_Cliente_sin_fk
	@Cedula BIGINT,
	@Nombre VARCHAR(MAX),
	@Apellido1 VARCHAR(MAX),
	@Apellido2 VARCHAR(MAX),
	@Telefono BIGINT,
	@Tipo INT,
	@Provincia VARCHAR(MAX)
AS
BEGIN
	DECLARE @IdProvincia INT;
	SET @IdProvincia = 1;
	SELECT @IdProvincia=Id FROM Provincia WHERE Nombre=@Provincia;
	INSERT INTO Cliente(Cedula,Nombre,Apellido1,Apellido2,Telefono,Tipo,IdProvincia)
	VALUES (@Cedula,@Nombre,@Apellido1,@Apellido2,@Telefono,@Tipo,@IdProvincia)
END
GO
/* Medicamento */
CREATE PROCEDURE sp_push_Medicamento
	@Nombre VARCHAR(MAX),
	@Descripcion VARCHAR(MAX),
	@DosisNinos VARCHAR(MAX),
	@DosisAdultos VARCHAR(MAX),
	@EfectosSecundarios VARCHAR(MAX),
	@Foto IMAGE,
	@Precio MONEY,
	@Tipo INT, 
	@IdMarca INT
AS
BEGIN
	INSERT INTO Medicamento(Nombre,Descripcion,DosisNinos,DosisAdultos,EfectosSecundarios,Foto,Precio,Tipo,IdMarca)
	VALUES (@Nombre,@Descripcion,@DosisNinos,@DosisAdultos,@EfectosSecundarios,@Foto,@Precio,@Tipo,@IdMarca)
END
GO
CREATE PROCEDURE sp_push_Medicamento_sin_fk
	@Nombre VARCHAR(MAX),
	@Descripcion VARCHAR(MAX),
	@DosisNinos VARCHAR(MAX),
	@DosisAdultos VARCHAR(MAX),
	@EfectosSecundarios VARCHAR(MAX),
	@Foto IMAGE,
	@Precio MONEY,
	@Tipo INT, 
	@Marca VARCHAR(MAX)
AS
BEGIN
	DECLARE @IdMarca INT;
	SET @IdMarca = 1;
	SELECT @IdMarca=Id FROM Marca WHERE Nombre=@Marca;
	INSERT INTO Medicamento(Nombre,Descripcion,DosisNinos,DosisAdultos,EfectosSecundarios,Foto,Precio,Tipo,IdMarca)
	VALUES (@Nombre,@Descripcion,@DosisNinos,@DosisAdultos,@EfectosSecundarios,@Foto,@Precio,@Tipo,@IdMarca)
END
GO
/* FarmaciaXMedicamento */
CREATE PROCEDURE sp_push_FarmaciaXMedicamento
	@IdFarmacia INT,
	@IdMedicamento INT,
	@Stock INT
AS
BEGIN
	INSERT INTO FarmaciaXMedicamento(IdFarmacia,IdMedicamento,Stock)
	VALUES (@IdFarmacia,@IdMedicamento,@Stock)
END
GO
CREATE PROCEDURE sp_push_FarmaciaXMedicamento_sin_fk
	@Farmacia INT,
	@Medicamento INT,
	@Stock INT
AS
BEGIN
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia = 0;
	SELECT @IdFarmacia=Id FROM Farmacia WHERE Nombre=@Farmacia;
	DECLARE @IdMedicamento INT;
	SET @IdMedicamento = 0;
	SELECT @IdMedicamento=Id FROM Medicamento WHERE Nombre=@Medicamento;
	INSERT INTO FarmaciaXMedicamento(IdFarmacia,IdMedicamento,Stock)
	VALUES (@IdFarmacia,@IdMedicamento,@Stock)
END
GO
/* Pedido */
CREATE PROCEDURE sp_push_Pedido
	@Fecha DATETIME,
	@Estado INT,
	@Monto MONEY,
	@Tipo INT,
	@IdCliente INT,
	@IdFarmacia INT
AS
BEGIN
	INSERT INTO Pedido(Fecha,Estado,Monto,Tipo,IdCliente,IdFarmacia)
	VALUES (@Fecha,@Estado,@Monto,@Tipo,@IdCliente,@IdFarmacia)
END
GO
CREATE PROCEDURE sp_push_Pedido_sin_fk
	@Fecha DATETIME,
	@Estado INT,
	@Monto MONEY,
	@Tipo INT,
	@CedulaCliente BIGINT,
	@Farmacia INT
AS
BEGIN
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia = 0;
	SELECT @IdFarmacia=Id FROM Farmacia WHERE Nombre=@Farmacia;
	DECLARE @IdCliente INT;
	SET @IdCliente = 0;
	SELECT @IdCliente=Id FROM Cliente WHERE Nombre=@CedulaCliente;
	INSERT INTO Pedido(Fecha,Estado,Monto,Tipo,IdCliente,IdFarmacia)
	VALUES (@Fecha,@Estado,@Monto,@Tipo,@IdCliente,@IdFarmacia)
END
GO
/* PedidoXMedicamento*/
CREATE PROCEDURE sp_push_PedidoXMedicamento
	@Cantidad INT,
	@IdPedido INT,
	@IdMedicamento INT
AS
BEGIN
	INSERT INTO PedidoXMedicamento(Cantidad,IdPedido,IdMedicamento)
	VALUES (@Cantidad, @IdPedido,@IdMedicamento)
END
GO
CREATE PROCEDURE sp_push_PedidoXMedicamento_sin_fk
	@Cantidad INT,
	@IdPedido INT,
	@Medicamento INT
AS
BEGIN
	DECLARE @IdMedicamento INT;
	SET @IdMedicamento = 0;
	SELECT @IdMedicamento=Id FROM Medicamento WHERE Nombre=@Medicamento;
	INSERT INTO PedidoXMedicamento(Cantidad,IdPedido,IdMedicamento)
	VALUES (@Cantidad, @IdPedido,@IdMedicamento)
END
GO

/**************** GET *****************/

USE FarmaTEC
GO
/* Cantidad de dinero recaudado en sucursal */
CREATE PROCEDURE sp_get_DineroRecaudadoEnSucursal
	@Id INT
AS
BEGIN
	SELECT TotalRecaudado FROM Farmacia WHERE Id = @Id
END
GO
CREATE PROCEDURE sp_get_DineroRecaudadoEnSucursal_sin_fk
	@Farmacia INT
AS
BEGIN
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia = 0;
	SELECT @IdFarmacia=Id FROM Medicamento WHERE Nombre=@Farmacia;
	SELECT TotalRecaudado FROM Farmacia WHERE Id = @IdFarmacia
END
GO
/* Pedidos en un rango de fechas*/
CREATE PROCEDURE sp_get_PedidosEnRango
	@FechaInicial DATETIME,
	@FechaFinal DATETIME
AS
BEGIN
	SELECT Fecha,Estado,Monto,Tipo,IdCliente,IdFarmacia FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial
END
GO
/* Cantida de pedidos en un rango de fechas*/
CREATE PROCEDURE sp_get_CantidadDePedidosEnRango
	@FechaInicial DATETIME,
	@FechaFinal DATETIME
AS
BEGIN
	SELECT COUNT(Id) AS CantidadDePedidos FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial
END
GO
/* Pedidos por cliente en un rango de fechas*/
CREATE PROCEDURE sp_get_PedidosXClienteEnRango
	@FechaInicial DATETIME,
	@FechaFinal DATETIME,
	@CedulaCliente INT
AS
BEGIN
	DECLARE @IdCliente INT;
	SET @IdCliente = 0;
	SELECT @IdCliente=Id FROM Cliente WHERE Cedula=@CedulaCliente;
	SELECT Fecha,Estado,Monto,Tipo,IdCliente,IdFarmacia FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial AND IdCliente=@IdCliente
END
GO
/* Monto promedio pagado por clientes en rango  */
CREATE PROCEDURE sp_get_MontoPromedioXClientesEnRango
	@FechaInicial DATETIME,
	@FechaFinal DATETIME
AS
BEGIN
	SELECT AVG(Monto) AS Promedio FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial
END
GO
/* Monto promedio pagado por cada cliente en rango  */
CREATE PROCEDURE sp_get_MontoPromedioXCadaClienteEnRango
	@FechaInicial DATETIME,
	@FechaFinal DATETIME
AS
BEGIN
	DECLARE @PromedioXCliente TABLE(Promedio FLOAT, IdCliente INT);
	INSERT INTO @PromedioXCliente
	SELECT AVG(Monto), IdCliente FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial GROUP BY IdCliente WITH ROLLUP
	SELECT c.Nombre, c.Apellido1, c.Apellido2,pxc.Promedio AS InfoCliente FROM Cliente c INNER JOIN @PromedioXCliente pxc ON pxc.IdCliente=c.Id
END
GO
/* Monto de pedidos en un rango específico segun el tipo  */
CREATE PROCEDURE sp_get_MontoParaTipoDePedido
	@FechaInicial DATETIME,
	@FechaFinal DATETIME,
	@Tipo INT
AS
BEGIN
	SELECT Monto FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaFinal AND Tipo=@Tipo
END
GO
/* Monto recaudado en una sucursal con x tipo de pedido */
CREATE PROCEDURE sp_get_MontoEnFarmaciaSegunTipoDePedido
	@IdFarmacia DATETIME,
	@Tipo INT
AS
BEGIN
	SELECT SUM(Monto) FROM Pedido WHERE IdFarmacia=@IdFarmacia AND Tipo>@Tipo
END
GO
/* Top Mejores Clientes */
CREATE PROCEDURE sp_get_TopClientes
	@FechaInicial DATETIME,
	@FechaFinal DATETIME
AS
BEGIN
	DECLARE @PromedioXCliente TABLE(Promedio FLOAT, IdCliente INT);
	INSERT INTO @PromedioXCliente
	SELECT AVG(Monto), IdCliente FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial GROUP BY IdCliente WITH ROLLUP
	SELECT TOP 3 c.Nombre, c.Apellido1, c.Apellido2,pxc.Promedio AS InfoCliente 
	FROM Cliente c INNER JOIN @PromedioXCliente pxc 
	ON pxc.IdCliente=c.Id 
	ORDER BY Promedio
END
GO
/* Get info Cliente */
CREATE PROCEDURE sp_get_Cliente
	@CedulaCliente BIGINT
AS
BEGIN
	SELECT c.Cedula,c.Nombre,c.Apellido1,c.Apellido2,c.Telefono,c.Tipo, p.Nombre AS Cliente 
	FROM Cliente c INNER JOIN Provincia p 
	ON p.Id=c.IdProvincia 
	WHERE Cedula=@CedulaCliente
END
GO


/**************** UPDATE *****************/
CREATE PROCEDURE sp_update_MontoFarmacia
	@IdFarmacia INT,
	@Monto MONEY
AS
BEGIN
	UPDATE Farmacia SET TotalRecaudado=@Monto WHERE Id=@IdFarmacia
END
GO
CREATE PROCEDURE sp_update_EstadoPedido
	@IdPedido INT,
	@Estado INT
AS
BEGIN
	UPDATE Pedido SET Estado=@Estado WHERE Id=@IdPedido
END
GO
