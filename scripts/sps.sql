/*****************************************/
/********** STORE PROCEDURES  ************/
/*****************************************/

USE FarmaTEC2
GO



/**************** GET ID CENTRAL ****************/
CREATE PROCEDURE sp_getid_Farmacia
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Farmacia
	RETURN @ID
END
GO

CREATE PROCEDURE sp_getid_Marca
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Marca
	RETURN @ID
END
GO

CREATE PROCEDURE sp_getid_Provincia
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Provincia
	RETURN @ID
END
GO

CREATE PROCEDURE sp_getid_Pedido
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Pedido
	RETURN @ID
END
GO


CREATE PROCEDURE sp_getid_Empleado
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Empleado
	RETURN @ID
END
GO

CREATE PROCEDURE sp_getid_Cliente
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Cliente
	RETURN @ID
END
GO

CREATE PROCEDURE sp_getid_Medicamento
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Medicamento
	RETURN @ID
END
GO
/***************** PUSH ******************/

/* Marca */
CREATE PROCEDURE sp_push_Marca
	@Nombre VARCHAR(MAX)
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @ID INT
	EXECUTE @ID = dbo.sp_getid_Marca
	INSERT INTO Marca(Id, Nombre) VALUES (@ID, @Nombre)
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;END
GO

/* Provincia */
CREATE PROCEDURE sp_push_Provincia
	@Nombre VARCHAR(MAX)
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @ID INT;
	EXECUTE @ID = dbo.sp_getid_Provincia
	INSERT INTO Provincia(Id, Nombre) VALUES (@ID, @Nombre)
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
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
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @ID INT;
	EXECUTE @ID = dbo.sp_getid_Farmacia
	DECLARE @Ubicacion geography;
	SET @Ubicacion = geography::Point(@PuntoA, @PuntoB, '4326');
	DECLARE @IdProvincia INT;
	SET @IdProvincia=0;
	SELECT @IdProvincia=Id FROM Provincia WHERE Nombre=@Provincia;
	INSERT INTO Farmacia (Id, Nombre,CedJuridica,Ubicacion,Telefono,Correo,Horario,TotalRecaudado,IdProvincia)  
	VALUES (@ID,@Nombre,@CedJuridica,@Ubicacion,@Telefono,@Correo,@Horario,@TotalRecaudado,@IdProvincia)
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
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
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @ID INT
	EXECUTE @ID = dbo.sp_getid_Empleado
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia=0;
	SELECT @IdFarmacia=Id FROM Farmacia WHERE CedJuridica=@CedJurídica;
	PRINT (@IdFarmacia);
	INSERT INTO Empleado(Id, Nombre,Apellido1,Apellido2,Tipo,Estado,Correo,Contraseña,IdFarmacia)  
	VALUES (@ID,@Nombre,@Apellido1,@Apellido2,@Tipo,@Estado,@Correo,@Contraseña,@IdFarmacia)
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
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
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @ID INT
	EXECUTE @ID = dbo.sp_getid_Cliente
	DECLARE @IdProvincia INT;
	SET @IdProvincia = 1;
	SELECT @IdProvincia=Id FROM Provincia WHERE Nombre=@Provincia;
	INSERT INTO Cliente(Id,Cedula,Nombre,Apellido1,Apellido2,Telefono,Tipo,IdProvincia)
	VALUES (@ID,@Cedula,@Nombre,@Apellido1,@Apellido2,@Telefono,@Tipo,@IdProvincia)
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
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
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @ID INT
	EXECUTE @ID = dbo.sp_getid_Medicamento
	DECLARE @IdMarca INT;
	SET @IdMarca = 1;
	SELECT @IdMarca=Id FROM Marca WHERE Nombre=@Marca;
	INSERT INTO Medicamento(Id, Nombre,CodigoDeMedicamento,Descripcion,DosisNinos,DosisAdultos,EfectosSecundarios,Foto,Precio,Tipo,IdMarca)
	VALUES (@ID,@Nombre,@CodigoDeMedicamento,@Descripcion,@DosisNinos,@DosisAdultos,@EfectosSecundarios,@Foto,@Precio,@Tipo,@IdMarca)
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
CREATE PROCEDURE sp_push_FarmaciaXMedicamento
	@CedJuridica BIGINT,
	@CodigoDeMedicamento VARCHAR(MAX),
	@Stock INT
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia = 0;
	SELECT @IdFarmacia=Id FROM Farmacia WHERE CedJuridica=@CedJuridica
	DECLARE @IdMedicamento INT;
	SET @IdMedicamento = 0;
	SELECT @IdMedicamento=Id FROM Medicamento WHERE CodigoDeMedicamento=@CodigoDeMedicamento
	INSERT INTO FarmaciaXMedicamento(IdFarmacia,IdMedicamento,Stock)
	VALUES (@IdFarmacia,@IdMedicamento,@Stock)
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Pedido */
CREATE PROCEDURE sp_push_Pedido
	@Fecha DATE,
	@Estado INT,
	@Monto MONEY,
	@Tipo INT,
	@CedulaCliente BIGINT,
	@CedJuridica BIGINT,
	@CodigoPedido VARCHAR(MAX)
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @ID INT
	EXECUTE @ID = dbo.sp_getid_Pedido
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia = 0;
	SELECT @IdFarmacia=Id FROM Farmacia WHERE CedJuridica=@CedJuridica;
	DECLARE @IdCliente INT;
	SET @IdCliente = 0;
	SELECT @IdCliente=Id FROM Cliente WHERE Cedula=@CedulaCliente;
	INSERT INTO Pedido(Id,Fecha,Estado,Monto,CodigoPedido,Tipo,IdCliente,IdFarmacia)
	VALUES (@ID,@Fecha,@Estado,@Monto,@CodigoPedido,@Tipo,@IdCliente,@IdFarmacia);
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
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
BEGIN TRANSACTION;
BEGIN TRY
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
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* FULL Pedido */
CREATE TYPE ListaDeCodigosDeMedicamentos AS TABLE (Idx INT IDENTITY(1,1) NOT NULL, CodigoDeMedicamento VARCHAR(MAX))
GO
CREATE TYPE ListaDeCantidades AS TABLE (Idx INT IDENTITY(1,1) NOT NULL, CantidadDeMedicamento INT)
GO
CREATE PROCEDURE sp_push_FullPedido  /******************* NEW PROC ***************************/
	@Fecha DATE,
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
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @ListaCodigoDeMedicamentos ListaDeCodigosDeMedicamentos;
	DECLARE @delimiter VARCHAR(MAX)= ',';
	DECLARE @V VARCHAR(MAX);
	WHILE CHARINDEX(@delimiter,@StringCodigoDeMedicamentos) <> 0
		BEGIN
			SET @V = substring(@StringCodigoDeMedicamentos,1,charindex(@delimiter,@StringCodigoDeMedicamentos)-1);
			INSERT INTO @ListaCodigoDeMedicamentos(CodigoDeMedicamento) VALUES(@V);
			SET @StringCodigoDeMedicamentos = substring(@StringCodigoDeMedicamentos,charindex(@delimiter,@StringCodigoDeMedicamentos)+1,len(@StringCodigoDeMedicamentos));
		END
	DECLARE @ListaDeCantidades ListaDeCantidades;
	WHILE CHARINDEX(@delimiter,@StringCantidades) <> 0
		BEGIN
			SET @V = substring(@StringCantidades,1,charindex(@delimiter,@StringCantidades)-1);
			INSERT INTO @ListaDeCantidades(CantidadDeMedicamento) VALUES(@V);
			SET @StringCantidades = substring(@StringCantidades,charindex(@delimiter,@StringCantidades)+1,len(@StringCantidades));
		END
	EXECUTE sp_push_Pedido @ID,@Fecha,@Estado,@Monto,@Tipo,@CedulaCliente,@CedJuridica,@CodigoPedido;
	DECLARE @i INT;
	SET @i=1;
	DECLARE @Cantidad INT;
	DECLARE @CodigoDeMedicamento VARCHAR(MAX);
	DECLARE @NumeroDeMedicamentos INT;
	SELECT @NumeroDeMedicamentos=MAX(Idx) FROM @ListaCodigoDeMedicamentos;
	SELECT @NumeroDeMedicamentos=MAX(Idx) FROM @ListaDeCantidades;
	PRINT(@NumeroDeMedicamentos);
	WHILE (@i <= @NumeroDeMedicamentos)
	BEGIN
		SELECT @Cantidad=CantidadDeMedicamento FROM @ListaDeCantidades WHERE Idx=@i;
		SELECT @CodigoDeMedicamento=CodigoDeMedicamento FROM @ListaCodigoDeMedicamentos WHERE Idx=@i;
		EXECUTE sp_push_PedidoXMedicamento @Cantidad,@CodigoPedido,@CodigoDeMedicamento,@CedJuridica;
		SET @i=@i+1;
	END
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/**************** GET *****************/

/* Cantidad de dinero recaudado en sucursal */
CREATE PROCEDURE sp_get_DineroRecaudadoEnSucursal
	@CedJuridica BIGINT
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT TotalRecaudado FROM Farmacia WHERE CedJuridica=@CedJuridica
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Pedidos en un rango de fechas */
CREATE PROCEDURE sp_get_PedidosEnRango
	@FechaInicial DATE,
	@FechaFinal DATE
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT Fecha,Estado,Monto,Tipo,IdCliente,IdFarmacia FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Cantida de pedidos en un rango de fechas */
CREATE PROCEDURE sp_get_CantidadDePedidosEnRango
	@FechaInicial DATE,
	@FechaFinal DATE
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT COUNT(Id) AS CantidadDePedidos FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Pedidos por cliente en un rango de fechas */
CREATE PROCEDURE sp_get_PedidosXClienteEnRango
	@FechaInicial DATE,
	@FechaFinal DATE,
	@CedulaCliente INT
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT p.CodigoPedido,p.Fecha,p.Estado,p.Monto,p.Tipo,c.Nombre,c.Apellido1,c.Apellido2,c.Cedula,f.Nombre
		FROM Pedido p 
		INNER JOIN Cliente c ON p.IdCliente=c.Id
		INNER JOIN Farmacia f ON p.IdFarmacia=f.Id
		WHERE P.Fecha<=@FechaFinal AND p.Fecha>=@FechaInicial AND c.Cedula=@CedulaCliente
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Monto promedio pagado por todos los clientes en rango */
CREATE PROCEDURE sp_get_MontoPromedioXClientesEnRango
	@FechaInicial DATE,
	@FechaFinal DATE
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT AVG(Monto) AS Promedio FROM Pedido WHERE Fecha<=@FechaFinal AND Fecha>=@FechaInicial
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Monto promedio pagado por cada cliente en rango */
CREATE PROCEDURE sp_get_MontoPromedioXCadaClienteEnRango
	@FechaInicial DATE,
	@FechaFinal DATE
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @PromedioXCliente TABLE(Promedio FLOAT, IdCliente INT);
	INSERT INTO @PromedioXCliente
		SELECT AVG(Monto), IdCliente FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial GROUP BY IdCliente WITH ROLLUP
	SELECT c.Nombre, c.Apellido1, c.Apellido2,pxc.Promedio AS InfoCliente FROM Cliente c INNER JOIN @PromedioXCliente pxc ON pxc.IdCliente=c.Id
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Monto de pedidos en un rango específico segun el tipo  */
CREATE PROCEDURE sp_get_MontoParaTipoDePedido
	@FechaInicial DATE,
	@FechaFinal DATE,
	@Tipo INT
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT Monto FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaFinal AND Tipo=@Tipo
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Monto de pedidos en un rango específico segun el tipo x sucursal  */
CREATE PROCEDURE sp_get_MontoParaTipoDePedidoXSucursal /**************** NEW PROC ************************/
	@FechaInicial DATE,
	@FechaFinal DATE,
	@Tipo INT,
	@CedJuridica BIGINT
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT p.Monto FROM Pedido p INNER JOIN Farmacia f ON p.IdFarmacia=f.Id WHERE p.Fecha<@FechaFinal AND p.Fecha>@FechaFinal AND f.CedJuridica=@CedJuridica 
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Monto recaudado en una sucursal con x tipo de pedido */
CREATE PROCEDURE sp_get_MontoEnFarmaciaSegunTipoDePedido
	@CedJuridica BIGINT,
	@Tipo INT
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT SUM(p.Monto) FROM Pedido p INNER JOIN Farmacia f ON f.Id=p.IdFarmacia WHERE f.CedJuridica=@CedJuridica AND p.Tipo>@Tipo
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Top 3 Mejores Clientes */
CREATE PROCEDURE sp_get_TopClientes
	@FechaInicial DATE,
	@FechaFinal DATE
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @PromedioXCliente TABLE(Promedio FLOAT, IdCliente INT);
	INSERT INTO @PromedioXCliente
	SELECT AVG(Monto), IdCliente FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial GROUP BY IdCliente WITH ROLLUP
	SELECT TOP 3 c.Nombre, c.Apellido1, c.Apellido2,c.Cedula,pxc.Promedio AS InfoCliente 
	FROM Cliente c INNER JOIN @PromedioXCliente pxc 
	ON pxc.IdCliente=c.Id 
	ORDER BY Promedio
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO

/** Generales **/
/* Get info Cliente por cédula */
CREATE PROCEDURE sp_get_Cliente
	@CedulaCliente BIGINT
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT c.Cedula,c.Nombre,c.Apellido1,c.Apellido2,c.Telefono,c.Tipo, p.Nombre AS Cliente 
	FROM Cliente c INNER JOIN Provincia p 
	ON p.Id=c.IdProvincia 
	WHERE Cedula=@CedulaCliente
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Obtener info de farmacia por CedJuridica */
CREATE PROCEDURE sp_get_Farmacia
	@CedJuridica BIGINT
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT Nombre,CedJuridica, Ubicacion,Telefono,Correo,Horario,TotalRecaudado
	FROM Farmacia
	WHERE CedJuridica=@CedJuridica
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Obtener full info de pedido por Código de pedido */
CREATE PROCEDURE sp_get_Pedido
	@CodigoDePedido VARCHAR(MAX)
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT f.Nombre,f.CedJuridica,p.Fecha,p.Estado,p.Monto,p.CodigoPedido,p.Tipo,c.Nombre,c.Apellido1,c.Apellido2,c.Cedula 
	AS InfoPedido
	FROM Pedido p 
	INNER JOIN Farmacia f ON p.IdFarmacia=f.Id
	INNER JOIN Cliente c ON p.IdCliente=c.Id
	WHERE p.CodigoPedido=@CodigoDePedido
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Obtener info de empleado por correo */
CREATE PROCEDURE sp_get_Empleado
	@Correo VARCHAR(MAX)
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT Nombre,Apellido1,Apellido2,Tipo,Estado,Correo 
	AS Empleado 
	FROM Empleado
	WHERE Correo=@Correo
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Obtener Total General */
CREATE PROCEDURE sp_get_MontoGeneral
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT SUM(TotalRecaudado) 
	AS TotalGeneral
	FROM Farmacia
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Obtener total de clientes */
CREATE PROCEDURE sp_get_TotalClientes
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	SELECT COUNT(Id) 
	AS CantidadDeClientes
	FROM Cliente
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
CREATE PROCEDURE sp_get_PedidosDeCliente   /*************** NEW PROC *********************/
	@Cedula INT
AS
BEGIN
BEGIN TRANSACTION
BEGIN TRY
	SELECT p.CodigoPedido, p.Estado, p.Tipo, p.Monto 
	FROM Pedido p INNER JOIN Cliente c
	ON p.IdCliente=c.Id
	WHERE c.Cedula=@Cedula
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO

/**************** UPDATE *****************/

/* Cambiar monto total recaudado por sucursal */
CREATE PROCEDURE sp_update_MontoFarmacia
	@CedJuridica BIGINT,
	@Monto MONEY
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia = 0;
	SELECT @IdFarmacia=Id FROM Farmacia WHERE CedJuridica=@CedJuridica
	UPDATE Farmacia SET TotalRecaudado=@Monto WHERE Id=@IdFarmacia
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Cambiar estado del pedido */
CREATE PROCEDURE sp_update_EstadoPedido
	@IdPedido INT,
	@Estado INT
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	UPDATE Pedido SET Estado=@Estado WHERE Id=@IdPedido
	IF @Estado=2
	BEGIN 
		DECLARE @IdFarmacia INT;
		DECLARE @Monto MONEY; 
		SELECT @IdFarmacia=f.Id,@Monto=p.Monto FROM Farmacia f INNER JOIN Pedido p ON p.IdFarmacia=f.Id  WHERE p.Id=@IdPedido;
		UPDATE Farmacia SET TotalRecaudado=TotalRecaudado+@Monto WHERE Id=@IdFarmacia;
	END 
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Actualizar stock */
CREATE PROCEDURE sp_update_FarmaciaXMedicamento_sin_fk
	@CedJuridica BIGINT,
	@CodigoDeMedicamento VARCHAR(MAX),
	@Stock INT
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia = 0;
	SELECT @IdFarmacia=Id FROM Farmacia WHERE CedJuridica=@CedJuridica
	DECLARE @IdMedicamento INT;
	SET @IdMedicamento = 0;
	SELECT @IdMedicamento=Id FROM Medicamento WHERE CodigoDeMedicamento=@CodigoDeMedicamento
	UPDATE FarmaciaXMedicamento SET Stock=@Stock WHERE IdFarmacia=@IdFarmacia AND IdMedicamento=@IdMedicamento
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
/* Actualizar cantidad de X medicamento en el pedido*/
CREATE PROCEDURE sp_update_CantidadDeMedicamentoEnPedido
	@CodigoDePedido VARCHAR(MAX),
	@CodigoDeMedicamento VARCHAR(MAX),
	@Cantidad INT
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @IdPedido INT;
	SET @IdPedido = 0;
	SELECT @IdPedido=Id FROM Pedido WHERE CodigoPedido=@CodigoDePedido
	DECLARE @IdMedicamento INT;
	SET @IdMedicamento = 0;
	SELECT @IdMedicamento=Id FROM Medicamento WHERE CodigoDeMedicamento=@CodigoDeMedicamento
	UPDATE PedidoXMedicamento SET Cantidad=@Cantidad WHERE IdPedido=@IdPedido AND IdMedicamento=@IdMedicamento
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO

/**************** DELETE *****************/
/* Eliminar medicamento de pedido */
CREATE PROCEDURE sp_delete_PedidoXMedicamento
	@CodigoDePedido VARCHAR(MAX),
	@CodigoDeMedicamento VARCHAR(MAX)
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @IdPedido INT;
	SET @IdPedido = 0;
	SELECT @IdPedido=Id FROM Pedido WHERE CodigoPedido=@CodigoDePedido
	DECLARE @IdMedicamento INT;
	SET @IdMedicamento = 0;
	SELECT @IdMedicamento=Id FROM Medicamento WHERE CodigoDeMedicamento=@CodigoDeMedicamento
	DELETE FROM PedidoXMedicamento WHERE IdMedicamento=@IdMedicamento AND IdPedido=@IdPedido
COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;
END
GO
