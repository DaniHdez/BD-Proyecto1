
/**************** GET ID CENTRAL ****************/
CREATE FUNCTION fn_getid_Farmacia ( )
RETURNS INTEGER
AS
BEGIN
	DECLARE @id INTEGER
	SELECT @id = COUNT(*) FROM Farmacia
	RETURN @id 
END
GO

CREATE FUNCTION fn_getid_Empleado RETURN INTEGER
AS
BEGIN
	DECLARE @id INTEGER
	@id = SELECT COUNT (*) FROM Empleado
	RETURN @id 
END
GO


CREATE FUNCTION fn_getid_Cliente RETURN INTEGER
AS
BEGIN
	DECLARE @id INTEGER
	@id = SELECT COUNT (*) FROM Cliente
	RETURN @id 
END
GO

CREATE FUNCTION fn_getid_Medicamento RETURN INTEGER
AS
BEGIN
	DECLARE @id INTEGER
	@id = SELECT COUNT (*) FROM Medicamento
	RETURN @id 
END
GO

CREATE FUNCTION fn_getid_Pedido RETURN INTEGER
AS
BEGIN
	DECLARE @id INTEGER
	@id = SELECT COUNT (*) FROM Pedido
	RETURN @id 
END
GO

CREATE FUNCTION fn_getid_Provincia RETURN INTEGER
AS
BEGIN
	DECLARE @id INTEGER
	@id = SELECT COUNT (*) FROM Provincia
	RETURN @id 
END


BEGIN
	declare @id INT 
	SET @id = (SELECT dbo.fn_getid_Farmacia())
	INSERT INTO Farmacia (Id,Nombre,CedJuridica,Ubicacion,Telefono,Correo,Horario,TotalRecaudado)  
	VALUES (@id, @Nombre,@CedJuridica,@Ubicacion,@Telefono,@Correo,@Horario,@TotalRecaudado)
END
GO