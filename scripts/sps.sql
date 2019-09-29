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
	@PuntoA VARCHAR(MAX),
	@PuntoB VARCHAR(MAX),
	@Telefono BIGINT,
	@Correo VARCHAR(MAX),
	@Horario VARCHAR(MAX),
	@TotalRecaudado MONEY,
	@Provincia VARCHAR(MAX)
AS
BEGIN
	DECLARE @Ubicacion geography;
	SET @Ubicacion = geography::Point(@PuntoA, @PuntoB, '4326');
	DECLARE @IdProvincia INT;
	SET @IdProvincia=0;
	SELECT @IdProvincia=Id FROM Provincia WHERE Nombre=@Provincia;
	INSERT INTO Farmacia (Nombre,CedJuridica,Ubicacion,Telefono,Correo,Horario,TotalRecaudado,IdProvincia)  
	VALUES (@Nombre,@CedJuridica,@Ubicacion,@Telefono,@Correo,@Horario,@TotalRecaudado,@IdProvincia)
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
	@Contraseña VARCHAR(MAX),
	@CedJurídica BIGINT
AS
BEGIN
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia=0;
	SELECT @IdFarmacia=Id FROM Farmacia WHERE CedJuridica=@CedJurídica;
	PRINT (@IdFarmacia);
	INSERT INTO Empleado(Nombre,Apellido1,Apellido2,Tipo,Estado,Correo,Contraseña,IdFarmacia)  
	VALUES (@Nombre,@Apellido1,@Apellido2,@Tipo,@Estado,@Correo,@Contraseña,@IdFarmacia)
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
	@CodigoDeMedicamento VARCHAR(MAX),
	@Descripcion VARCHAR(MAX),
	@DosisNinos VARCHAR(MAX),
	@DosisAdultos VARCHAR(MAX),
	@EfectosSecundarios VARCHAR(MAX),
	@Foto VARBINARY(MAX),
	@Precio MONEY,
	@Tipo VARCHAR(MAX), 
	@Marca VARCHAR(MAX)
AS
BEGIN
	DECLARE @IdMarca INT;
	SET @IdMarca = 1;
	SELECT @IdMarca=Id FROM Marca WHERE Nombre=@Marca;
	INSERT INTO Medicamento(Nombre,CodigoDeMedicamento,Descripcion,DosisNinos,DosisAdultos,EfectosSecundarios,Foto,Precio,Tipo,IdMarca)
	VALUES (@Nombre,@CodigoDeMedicamento,@Descripcion,@DosisNinos,@DosisAdultos,@EfectosSecundarios,@Foto,@Precio,@Tipo,@IdMarca)
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
	@CedJuridica BIGINT,
	@CodigoDeMedicamento VARCHAR(MAX),
	@Stock INT
AS
BEGIN
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia = 0;
	SELECT @IdFarmacia=Id FROM Farmacia WHERE CedJuridica=@CedJuridica
	DECLARE @IdMedicamento INT;
	SET @IdMedicamento = 0;
	SELECT @IdMedicamento=Id FROM Medicamento WHERE CodigoDeMedicamento=@CodigoDeMedicamento
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
	@CedulaCliente BIGINT,
	@CedJuridica BIGINT,
	@CodigoPedido VARCHAR(MAX)
AS
BEGIN
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia = 0;
	SELECT @IdFarmacia=Id FROM Farmacia WHERE CedJuridica=@CedJuridica;
	DECLARE @IdCliente INT;
	SET @IdCliente = 0;
	SELECT @IdCliente=Id FROM Cliente WHERE Cedula=@CedulaCliente;
	INSERT INTO Pedido(Fecha,Estado,Monto,CodigoPedido,Tipo,IdCliente,IdFarmacia)
	VALUES (@Fecha,@Estado,@Monto,@CodigoPedido,@Tipo,@IdCliente,@IdFarmacia);
END
GO
/* PedidoXMedicamento*/
CREATE PROCEDURE sp_push_PedidoXMedicamento
	@Cantidad INT,
	@CodigoPedido VARCHAR(MAX),
	@CodigoDeMedicamento VARCHAR(MAX),
	@CedJuridicaFarmacia BIGINT
AS
BEGIN
	DECLARE @Stock INT;
	SET @Stock = 0;
	SELECT @Stock=fxm.Stock FROM FarmaciaXMedicamento fxm INNER JOIN Farmacia f ON f.CedJuridica=@CedJuridicaFarmacia WHERE fxm.IdFarmacia=f.Id;
	IF @Stock>=@Cantidad
	BEGIN
		DECLARE @IdMedicamento INT;
		SET @IdMedicamento = 0;
		SELECT @IdMedicamento=Id FROM Medicamento WHERE CodigoDeMedicamento=@CodigoDeMedicamento;
		DECLARE @IdPedido INT;
		SET @IdPedido = 0;
		SELECT @IdPedido=Id FROM Pedido WHERE CodigoPedido=@CodigoPedido;
		INSERT INTO PedidoXMedicamento(Cantidad,IdPedido,IdMedicamento)
			VALUES (@Cantidad, @IdPedido,@IdMedicamento);
		UPDATE FarmaciaXMedicamento 
			SET Stock=Stock-@Cantidad 
			FROM Farmacia f INNER JOIN FarmaciaXMedicamento fxm ON f.Id=fxm.IdFarmacia 
			WHERE f.CedJuridica=@CedJuridicaFarmacia AND IdMedicamento=@IdMedicamento
	END
END
GO
/* FULL Pedido */
CREATE TYPE ListaDeCodigosDeMedicamentos AS TABLE (Idx INT, CodigoDeMedicamento VARCHAR(MAX))
GO
CREATE TYPE ListaDeCantidades AS TABLE (Idx INT, CantidadDeMedicamento INT)
GO

CREATE PROCEDURE sp_push_FullPedido
	@Fecha DATETIME,
	@Estado INT,
	@Monto MONEY,
	@CodigoPedido VARCHAR(MAX),
	@Tipo INT,
	@CedulaCliente BIGINT,
	@CedJuridica BIGINT,
	@StringCodigoDeMedicamentos VARCHAR(MAX),
	@StringCantidades VARCHAR(MAX)
AS
BEGIN

	DECLARE @ListaCodigoDeMedicamentos ListaDeCodigosDeMedicamentos;
	DECLARE @ListaDeCantidades ListaDeCantidades;
	
	DECLARE @QueryDeListas VARCHAR(MAX);
	SET @QueryDeListas = 'INSERT INTO @ListaCodigoDeMedicamentos VALUES(' + @StringCodigoDeMedicamentos + ')';
	PRINT(@QueryDeListas);
	EXECUTE(@QueryDeListas);
	
	SET @QueryDeListas = 'INSERT INTO @ListaDeCantidades VALUES(' + @StringCantidades + ')';
	PRINT(@QueryDeListas);
	EXECUTE(@QueryDeListas);

	EXECUTE sp_push_Pedido @Fecha,@Estado,@Monto,@Tipo,@CedulaCliente,@CedJuridica,@CodigoPedido;

	DECLARE @i INT;
	SET @i=1;

	DECLARE @Cantidad INT;
	DECLARE @CodigoDeMedicamento VARCHAR(MAX);

	WHILE (@i <= (SELECT MAX(Idx) FROM @ListaCodigoDeMedicamentos))
	BEGIN
		SELECT @Cantidad=CantidadDeMedicamento FROM @ListaDeCantidades WHERE Idx=@i;
		SELECT @CodigoDeMedicamento=CodigoDeMedicamento FROM @ListaCodigoDeMedicamentos WHERE Idx=@i;
		EXECUTE sp_push_PedidoXMedicamento @Cantidad,@CodigoPedido,@CodigoDeMedicamento,@CedJuridica;
	END
END
GO
/**************** GET *****************/

/* Cantidad de dinero recaudado en sucursal */
CREATE PROCEDURE sp_get_DineroRecaudadoEnSucursal
	@CedJuridica BIGINT
AS
BEGIN
	SELECT TotalRecaudado FROM Farmacia WHERE CedJuridica=@CedJuridica
END
GO
/* Pedidos en un rango de fechas */
CREATE PROCEDURE sp_get_PedidosEnRango
	@FechaInicial DATETIME,
	@FechaFinal DATETIME
AS
BEGIN
	SELECT Fecha,Estado,Monto,Tipo,IdCliente,IdFarmacia FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial
END
GO
/* Cantida de pedidos en un rango de fechas */
CREATE PROCEDURE sp_get_CantidadDePedidosEnRango
	@FechaInicial DATETIME,
	@FechaFinal DATETIME
AS
BEGIN
	SELECT COUNT(Id) AS CantidadDePedidos FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial
END
GO
/* Pedidos por cliente en un rango de fechas */
CREATE PROCEDURE sp_get_PedidosXClienteEnRango
	@FechaInicial DATETIME,
	@FechaFinal DATETIME,
	@CedulaCliente INT
AS
BEGIN
	SELECT p.CodigoPedido,p.Fecha,p.Estado,p.Monto,p.Tipo,c.Nombre,c.Apellido1,c.Apellido2,c.Cedula,f.Nombre
		FROM Pedido p 
		INNER JOIN Cliente c ON p.IdCliente=c.Id
		INNER JOIN Farmacia f ON p.IdFarmacia=f.Id
		WHERE P.Fecha<=@FechaFinal AND p.Fecha>=@FechaInicial AND c.Cedula=@CedulaCliente
END
GO
/* Monto promedio pagado por todos los clientes en rango */
CREATE PROCEDURE sp_get_MontoPromedioXClientesEnRango
	@FechaInicial DATETIME,
	@FechaFinal DATETIME
AS
BEGIN
	SELECT AVG(Monto) AS Promedio FROM Pedido WHERE Fecha<=@FechaFinal AND Fecha>=@FechaInicial
END
GO
/* Monto promedio pagado por cada cliente en rango */
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
/* Top 3 Mejores Clientes */
CREATE PROCEDURE sp_get_TopClientes
	@FechaInicial DATETIME,
	@FechaFinal DATETIME
AS
BEGIN
	DECLARE @PromedioXCliente TABLE(Promedio FLOAT, IdCliente INT);
	INSERT INTO @PromedioXCliente
	SELECT AVG(Monto), IdCliente FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial GROUP BY IdCliente WITH ROLLUP
	SELECT TOP 3 c.Nombre, c.Apellido1, c.Apellido2,c.Cedula,pxc.Promedio AS InfoCliente 
	FROM Cliente c INNER JOIN @PromedioXCliente pxc 
	ON pxc.IdCliente=c.Id 
	ORDER BY Promedio
END
GO

/** Generales **/
/* Get info Cliente por cédula */
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
/* Obtener info de farmacia por CedJuridica */
CREATE PROCEDURE sp_get_Farmacia
	@CedJuridica BIGINT
AS
BEGIN
	SELECT Nombre,CedJuridica, Ubicacion,Telefono,Correo,Horario,TotalRecaudado
	FROM Farmacia
	WHERE CedJuridica=@CedJuridica
END
GO
/* Obtener full info de pedido por Código de pedido */
CREATE PROCEDURE sp_get_Pedido
	@CodigoDePedido VARCHAR(MAX)
AS
BEGIN
	SELECT f.Nombre,f.CedJuridica,p.Fecha,p.Estado,p.Monto,p.CodigoPedido,p.Tipo,c.Nombre,c.Apellido1,c.Apellido2,c.Cedula 
	AS InfoPedido
	FROM Pedido p 
	INNER JOIN Farmacia f ON p.IdFarmacia=f.Id
	INNER JOIN Cliente c ON p.IdCliente=c.Id
	WHERE p.CodigoPedido=@CodigoDePedido
END
GO
/* Obtener info de empleado por correo */
CREATE PROCEDURE sp_get_Empleado
	@Correo VARCHAR(MAX)
AS
BEGIN
	SELECT Nombre,Apellido1,Apellido2,Tipo,Estado,Correo 
	AS Empleado 
	FROM Empleado
	WHERE Correo=@Correo
END
GO
/* Obtener Total General */
CREATE PROCEDURE sp_get_MontoGeneral
AS
BEGIN
	SELECT SUM(TotalRecaudado) 
	AS TotalGeneral
	FROM Farmacia
END
GO
/* Obtener total de clientes */
CREATE PROCEDURE sp_get_TotalClientes
AS
BEGIN
	SELECT COUNT(Id) 
	AS CantidadDeClientes
	FROM Cliente
END
GO

/**************** UPDATE *****************/

/* Cambiar monto total recaudado por sucursal */
CREATE PROCEDURE sp_update_MontoFarmacia
	@CedJuridica BIGINT,
	@Monto MONEY
AS
BEGIN
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia = 0;
	SELECT @IdFarmacia=Id FROM Farmacia WHERE CedJuridica=@CedJuridica
	UPDATE Farmacia SET TotalRecaudado=@Monto WHERE Id=@IdFarmacia
END
GO
/* Cambiar estado del pedido */
CREATE PROCEDURE sp_update_EstadoPedido
	@IdPedido INT,
	@Estado INT
AS
BEGIN
	UPDATE Pedido SET Estado=@Estado WHERE Id=@IdPedido
END
GO
/* Actualizar stock */
CREATE PROCEDURE sp_update_FarmaciaXMedicamento_sin_fk
	@CedJuridica BIGINT,
	@CodigoDeMedicamento VARCHAR(MAX),
	@Stock INT
AS
BEGIN
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia = 0;
	SELECT @IdFarmacia=Id FROM Farmacia WHERE CedJuridica=@CedJuridica
	DECLARE @IdMedicamento INT;
	SET @IdMedicamento = 0;
	SELECT @IdMedicamento=Id FROM Medicamento WHERE CodigoDeMedicamento=@CodigoDeMedicamento
	UPDATE FarmaciaXMedicamento SET Stock=@Stock WHERE IdFarmacia=@IdFarmacia AND IdMedicamento=@IdMedicamento
END
GO
/* Actualizar cantidad de X medicamento en el pedido*/
CREATE PROCEDURE sp_update_CantidadDeMedicamentoEnPedido
	@CodigoDePedido VARCHAR(MAX),
	@CodigoDeMedicamento VARCHAR(MAX),
	@Cantidad INT
AS
BEGIN
	DECLARE @IdPedido INT;
	SET @IdPedido = 0;
	SELECT @IdPedido=Id FROM Pedido WHERE CodigoPedido=@CodigoDePedido
	DECLARE @IdMedicamento INT;
	SET @IdMedicamento = 0;
	SELECT @IdMedicamento=Id FROM Medicamento WHERE CodigoDeMedicamento=@CodigoDeMedicamento
	UPDATE PedidoXMedicamento SET Cantidad=@Cantidad WHERE IdPedido=@IdPedido AND IdMedicamento=@IdMedicamento
END
GO

/**************** DELETE *****************/
/* Eliminar medicamento de pedido */
CREATE PROCEDURE sp_delete_PedidoXMedicamento
	@CodigoDePedido VARCHAR(MAX),
	@CodigoDeMedicamento VARCHAR(MAX)
AS
BEGIN
	DECLARE @IdPedido INT;
	SET @IdPedido = 0;
	SELECT @IdPedido=Id FROM Pedido WHERE CodigoPedido=@CodigoDePedido
	DECLARE @IdMedicamento INT;
	SET @IdMedicamento = 0;
	SELECT @IdMedicamento=Id FROM Medicamento WHERE CodigoDeMedicamento=@CodigoDeMedicamento
	DELETE FROM PedidoXMedicamento WHERE IdMedicamento=@IdMedicamento AND IdPedido=@IdPedido
END
GO
