/*FULL BASE SIN ERRORES*/


USE [master]
GO
/****** Object:  Database [FarmaTEC]    Script Date: 29/9/2019 18:20:56 ******/
CREATE DATABASE [FarmaTEC]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FarmaTEC', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\FarmaTEC.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'FarmaTEC_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\FarmaTEC_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [FarmaTEC] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FarmaTEC].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FarmaTEC] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FarmaTEC] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FarmaTEC] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FarmaTEC] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FarmaTEC] SET ARITHABORT OFF 
GO
ALTER DATABASE [FarmaTEC] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FarmaTEC] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FarmaTEC] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FarmaTEC] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FarmaTEC] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FarmaTEC] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FarmaTEC] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FarmaTEC] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FarmaTEC] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FarmaTEC] SET  DISABLE_BROKER 
GO
ALTER DATABASE [FarmaTEC] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FarmaTEC] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FarmaTEC] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FarmaTEC] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FarmaTEC] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FarmaTEC] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FarmaTEC] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FarmaTEC] SET RECOVERY FULL 
GO
ALTER DATABASE [FarmaTEC] SET  MULTI_USER 
GO
ALTER DATABASE [FarmaTEC] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FarmaTEC] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FarmaTEC] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FarmaTEC] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [FarmaTEC] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'FarmaTEC', N'ON'
GO
ALTER DATABASE [FarmaTEC] SET QUERY_STORE = OFF
GO
USE [FarmaTEC]
GO
/****** Object:  UserDefinedTableType [dbo].[ListaDeCantidades]    Script Date: 29/9/2019 18:20:56 ******/
CREATE TYPE [dbo].[ListaDeCantidades] AS TABLE(
	[Idx] [int]  IDENTITY(1,1) NOT NULL,
	[CantidadDeMedicamento] [int] NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[ListaDeCodigosDeMedicamentos]    Script Date: 29/9/2019 18:20:56 ******/
CREATE TYPE [dbo].[ListaDeCodigosDeMedicamentos] AS TABLE(
	[Idx] [int]  IDENTITY(1,1) NOT NULL,
	[CodigoDeMedicamento] [varchar](max) NULL
)
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[Id] [int] NOT NULL,
	[Cedula] [bigint] NOT NULL,
	[Nombre] [varchar](max) NOT NULL,
	[Apellido1] [varchar](max) NOT NULL,
	[Apellido2] [varchar](max) NOT NULL,
	[Telefono] [bigint] NOT NULL,
	[Tipo] [int] NOT NULL,
	[IdProvincia] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Empleado]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empleado](
	[Id] [int] NOT NULL,
	[Nombre] [varchar](max) NOT NULL,
	[Apellido1] [varchar](max) NOT NULL,
	[Apellido2] [varchar](max) NOT NULL,
	[Correo] [varchar](max) NOT NULL,
	[Contraseña] [varchar](max) NOT NULL,
	[Tipo] [int] NOT NULL,
	[Estado] [bit] NOT NULL,
	[IdFarmacia] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Farmacia]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Farmacia](
	[Id] [int] NOT NULL,
	[Nombre] [varchar](max) NOT NULL,
	[CedJuridica] [bigint] NOT NULL,
	[Ubicacion] [geography] NOT NULL,
	[Telefono] [bigint] NOT NULL,
	[Correo] [varchar](max) NOT NULL,
	[Horario] [varchar](max) NOT NULL,
	[TotalRecaudado] [money] NOT NULL,
	[IdProvincia] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FarmaciaXMedicamento]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FarmaciaXMedicamento](
	[IdFarmacia] [int] NOT NULL,
	[IdMedicamento] [int] NOT NULL,
	[Stock] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Marca]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Marca](
	[Id] [int] NOT NULL,
	[Nombre] [varchar](max) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Medicamento]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicamento](
	[Id] [int] NOT NULL,
	[Nombre] [varchar](max) NOT NULL,
	[Descripcion] [varchar](max) NOT NULL,
	[DosisNinos] [varchar](max) NOT NULL,
	[DosisAdultos] [varchar](max) NOT NULL,
	[EfectosSecundarios] [varchar](max) NOT NULL,
	[Foto] [varbinary](max) NOT NULL,
	[Precio] [money] NOT NULL,
	[CodigoDeMedicamento] [varchar](max) NOT NULL,
	[Tipo] [varchar](max) NOT NULL,
	[IdMarca] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pedido]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pedido](
	[Id] [int] NOT NULL,
	[Fecha] [date] NOT NULL,
	[Estado] [int] NOT NULL,
	[Monto] [money] NOT NULL,
	[CodigoPedido] [varchar](max) NOT NULL,
	[Tipo] [int] NOT NULL,
	[IdCliente] [int] NOT NULL,
	[IdFarmacia] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PedidoXMedicamento]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PedidoXMedicamento](
	[Cantidad] [int] NOT NULL,
	[IdPedido] [int] NOT NULL,
	[IdMedicamento] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Provincia]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Provincia](
	[Id] [int] NOT NULL,
	[Nombre] [varchar](max) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [U_Cedula]    Script Date: 29/9/2019 18:20:56 ******/
CREATE NONCLUSTERED INDEX [U_Cedula] ON [dbo].[Cliente]
(
	[Cedula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [U_Id]    Script Date: 29/9/2019 18:20:56 ******/
CREATE UNIQUE NONCLUSTERED INDEX [U_Id] ON [dbo].[Cliente]
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [U_Correo]    Script Date: 29/9/2019 18:20:56 ******/
CREATE UNIQUE NONCLUSTERED INDEX [U_Correo] ON [dbo].[Empleado]
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [U_Id]    Script Date: 29/9/2019 18:20:56 ******/
CREATE UNIQUE NONCLUSTERED INDEX [U_Id] ON [dbo].[Empleado]
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [U_CedJuridica]    Script Date: 29/9/2019 18:20:56 ******/
CREATE UNIQUE NONCLUSTERED INDEX [U_CedJuridica] ON [dbo].[Farmacia]
(
	[CedJuridica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [U_Id]    Script Date: 29/9/2019 18:20:56 ******/
CREATE UNIQUE NONCLUSTERED INDEX [U_Id] ON [dbo].[Farmacia]
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [U_Id]    Script Date: 29/9/2019 18:20:56 ******/
CREATE UNIQUE NONCLUSTERED INDEX [U_Id] ON [dbo].[Marca]
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [U_Id]    Script Date: 29/9/2019 18:20:56 ******/
CREATE UNIQUE NONCLUSTERED INDEX [U_Id] ON [dbo].[Medicamento]
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [U_Id]    Script Date: 29/9/2019 18:20:56 ******/
CREATE UNIQUE NONCLUSTERED INDEX [U_Id] ON [dbo].[Pedido]
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [U_Id]    Script Date: 29/9/2019 18:20:56 ******/
CREATE UNIQUE NONCLUSTERED INDEX [U_Id] ON [dbo].[Provincia]
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Empleado]  WITH CHECK ADD  CONSTRAINT [FK_Empleado_Farmacia] FOREIGN KEY([IdFarmacia])
REFERENCES [dbo].[Farmacia] ([Id])
GO
ALTER TABLE [dbo].[Empleado] CHECK CONSTRAINT [FK_Empleado_Farmacia]
GO
ALTER TABLE [dbo].[Farmacia]  WITH CHECK ADD  CONSTRAINT [FK_Farmacia_Provincia] FOREIGN KEY([IdProvincia])
REFERENCES [dbo].[Provincia] ([Id])
GO
ALTER TABLE [dbo].[Farmacia] CHECK CONSTRAINT [FK_Farmacia_Provincia]
GO
ALTER TABLE [dbo].[FarmaciaXMedicamento]  WITH CHECK ADD  CONSTRAINT [FK_FarmaciaXMedicamento_Farmacia] FOREIGN KEY([IdFarmacia])
REFERENCES [dbo].[Farmacia] ([Id])
GO
ALTER TABLE [dbo].[FarmaciaXMedicamento] CHECK CONSTRAINT [FK_FarmaciaXMedicamento_Farmacia]
GO
ALTER TABLE [dbo].[FarmaciaXMedicamento]  WITH CHECK ADD  CONSTRAINT [FK_FarmaciaXMedicamento_Medicamento] FOREIGN KEY([IdMedicamento])
REFERENCES [dbo].[Medicamento] ([Id])
GO
ALTER TABLE [dbo].[FarmaciaXMedicamento] CHECK CONSTRAINT [FK_FarmaciaXMedicamento_Medicamento]
GO
ALTER TABLE [dbo].[Medicamento]  WITH CHECK ADD  CONSTRAINT [FK_Medicamento_Marca] FOREIGN KEY([IdMarca])
REFERENCES [dbo].[Marca] ([Id])
GO
ALTER TABLE [dbo].[Medicamento] CHECK CONSTRAINT [FK_Medicamento_Marca]
GO
ALTER TABLE [dbo].[Pedido]  WITH CHECK ADD  CONSTRAINT [FK_Pedido_Cliente] FOREIGN KEY([IdCliente])
REFERENCES [dbo].[Cliente] ([Id])
GO
ALTER TABLE [dbo].[Pedido] CHECK CONSTRAINT [FK_Pedido_Cliente]
GO
ALTER TABLE [dbo].[Pedido]  WITH CHECK ADD  CONSTRAINT [FK_Pedido_Farmacia] FOREIGN KEY([IdFarmacia])
REFERENCES [dbo].[Farmacia] ([Id])
GO
ALTER TABLE [dbo].[Pedido] CHECK CONSTRAINT [FK_Pedido_Farmacia]
GO
ALTER TABLE [dbo].[PedidoXMedicamento]  WITH CHECK ADD  CONSTRAINT [FK_PedidoXMedicamento_Medicamento] FOREIGN KEY([IdPedido])
REFERENCES [dbo].[Pedido] ([Id])
GO
ALTER TABLE [dbo].[PedidoXMedicamento] CHECK CONSTRAINT [FK_PedidoXMedicamento_Medicamento]
GO
ALTER TABLE [dbo].[PedidoXMedicamento]  WITH CHECK ADD  CONSTRAINT [FK_PedidoXMedicamento_Medicamento1] FOREIGN KEY([IdMedicamento])
REFERENCES [dbo].[Medicamento] ([Id])
GO
ALTER TABLE [dbo].[PedidoXMedicamento] CHECK CONSTRAINT [FK_PedidoXMedicamento_Medicamento1]
GO
/****** Object:  StoredProcedure [dbo].[sp_delete_PedidoXMedicamento]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/**************** DELETE *****************/
/* Eliminar medicamento de pedido */
CREATE PROCEDURE [dbo].[sp_delete_PedidoXMedicamento]
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
/****** Object:  StoredProcedure [dbo].[sp_get_CantidadDePedidosEnRango]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Cantida de pedidos en un rango de fechas */
CREATE PROCEDURE [dbo].[sp_get_CantidadDePedidosEnRango]
	@FechaInicial DATE,
	@FechaFinal DATE
AS
BEGIN


	SELECT COUNT(Id) AS CantidadDePedidos FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial





END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_Cliente]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/** Generales **/
/* Get info Cliente por cédula */
CREATE PROCEDURE [dbo].[sp_get_Cliente]
	@CedulaCliente BIGINT
AS
BEGIN


	SELECT c.Cedula,c.Nombre,c.Apellido1,c.Apellido2,c.Telefono,c.Tipo, p.Nombre AS Cliente 
	FROM Cliente c INNER JOIN Provincia p 
	ON p.Id=c.IdProvincia 
	WHERE Cedula=@CedulaCliente





END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_DineroRecaudadoEnSucursal]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************** GET *****************/

/* Cantidad de dinero recaudado en sucursal */
CREATE PROCEDURE [dbo].[sp_get_DineroRecaudadoEnSucursal]
	@CedJuridica BIGINT
AS
BEGIN


	SELECT TotalRecaudado FROM Farmacia WHERE CedJuridica=@CedJuridica





END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_Empleado]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Obtener info de empleado por correo */
CREATE PROCEDURE [dbo].[sp_get_Empleado]
	@Correo VARCHAR(MAX)
AS
BEGIN


	SELECT Nombre,Apellido1,Apellido2,Tipo,Estado,Correo 
	AS Empleado 
	FROM Empleado
	WHERE Correo=@Correo





END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_Farmacia]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Obtener info de farmacia por CedJuridica */
CREATE PROCEDURE [dbo].[sp_get_Farmacia]
	@CedJuridica BIGINT
AS
BEGIN


	SELECT Nombre,CedJuridica, Ubicacion,Telefono,Correo,Horario,TotalRecaudado
	FROM Farmacia
	WHERE CedJuridica=@CedJuridica





END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_MontoEnFarmaciaSegunTipoDePedido]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Monto recaudado en una sucursal con x tipo de pedido */
CREATE PROCEDURE [dbo].[sp_get_MontoEnFarmaciaSegunTipoDePedido]
	@CedJuridica BIGINT,
	@Tipo INT
AS
BEGIN
	SELECT SUM(p.Monto) FROM Pedido p INNER JOIN Farmacia f ON f.Id=p.IdFarmacia WHERE f.CedJuridica=@CedJuridica AND p.Tipo=@Tipo
END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_MontoGeneral]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Obtener Total General */
CREATE PROCEDURE [dbo].[sp_get_MontoGeneral]
AS
BEGIN


	SELECT SUM(TotalRecaudado) 
	AS TotalGeneral
	FROM Farmacia





END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_MontoParaTipoDePedido]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Monto de pedidos en un rango específico segun el tipo  */
CREATE PROCEDURE [dbo].[sp_get_MontoParaTipoDePedido]
	@FechaInicial DATE,
	@FechaFinal DATE,
	@Tipo INT
AS
BEGIN
	SELECT Monto FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial AND Tipo=@Tipo
END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_MontoParaTipoDePedidoXSucursal]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Monto de pedidos en un rango específico segun el tipo x sucursal  */
CREATE PROCEDURE [dbo].[sp_get_MontoParaTipoDePedidoXSucursal] /**************** NEW PROC ************************/
	@FechaInicial DATE,
	@FechaFinal DATE,
	@Tipo INT,
	@CedJuridica BIGINT
AS
BEGIN
	SELECT p.Monto FROM Pedido p INNER JOIN Farmacia f ON p.IdFarmacia=f.Id WHERE p.Fecha<@FechaFinal AND p.Fecha>@FechaInicial AND f.CedJuridica=@CedJuridica 
END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_MontoPromedioXCadaClienteEnRango]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Monto promedio pagado por cada cliente en rango */
CREATE PROCEDURE [dbo].[sp_get_MontoPromedioXCadaClienteEnRango]
	@FechaInicial DATE,
	@FechaFinal DATE
AS
BEGIN


	DECLARE @PromedioXCliente TABLE(Promedio FLOAT, IdCliente INT);
	INSERT INTO @PromedioXCliente
		SELECT AVG(Monto), IdCliente FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial GROUP BY IdCliente WITH ROLLUP
	SELECT c.Nombre, c.Apellido1, c.Apellido2,pxc.Promedio AS InfoCliente FROM Cliente c INNER JOIN @PromedioXCliente pxc ON pxc.IdCliente=c.Id





END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_MontoPromedioXClientesEnRango]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Monto promedio pagado por todos los clientes en rango */
CREATE PROCEDURE [dbo].[sp_get_MontoPromedioXClientesEnRango]
	@FechaInicial DATE,
	@FechaFinal DATE
AS
BEGIN


	SELECT AVG(Monto) AS Promedio FROM Pedido WHERE Fecha<=@FechaFinal AND Fecha>=@FechaInicial





END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_Pedido]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Obtener full info de pedido por Código de pedido */
CREATE PROCEDURE [dbo].[sp_get_Pedido]
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
/****** Object:  StoredProcedure [dbo].[sp_get_PedidosDeCliente]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_get_PedidosDeCliente]   /*************** NEW PROC *********************/
	@Cedula INT
AS
BEGIN
BEGIN TRANSACTION

	SELECT p.CodigoPedido, p.Estado, p.Tipo, p.Monto 
	FROM Pedido p INNER JOIN Cliente c
	ON p.IdCliente=c.Id
	WHERE c.Cedula=@Cedula





END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_PedidosEnRango]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Pedidos en un rango de fechas */
CREATE PROCEDURE [dbo].[sp_get_PedidosEnRango]
	@FechaInicial DATE,
	@FechaFinal DATE
AS
BEGIN
	SELECT Fecha,Estado,Monto,Tipo,IdCliente,IdFarmacia FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial
END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_PedidosXClienteEnRango]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Pedidos por cliente en un rango de fechas */
CREATE PROCEDURE [dbo].[sp_get_PedidosXClienteEnRango]
	@FechaInicial DATE,
	@FechaFinal DATE,
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
/****** Object:  StoredProcedure [dbo].[sp_get_TopClientes]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Top 3 Mejores Clientes */
CREATE PROCEDURE [dbo].[sp_get_TopClientes]
	@FechaInicial DATE,
	@FechaFinal DATE
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
/****** Object:  StoredProcedure [dbo].[sp_get_TotalClientes]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Obtener total de clientes */
CREATE PROCEDURE [dbo].[sp_get_TotalClientes]
AS
BEGIN


	SELECT COUNT(Id) 
	AS CantidadDeClientes
	FROM Cliente





END
GO
/****** Object:  StoredProcedure [dbo].[sp_getid_Cliente]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_getid_Cliente]
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Cliente
	RETURN @ID
END
GO
/****** Object:  StoredProcedure [dbo].[sp_getid_Empleado]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_getid_Empleado]
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Empleado
	RETURN @ID
END
GO
/****** Object:  StoredProcedure [dbo].[sp_getid_Farmacia]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/**************** GET ID CENTRAL ****************/
CREATE PROCEDURE [dbo].[sp_getid_Farmacia]
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Farmacia
	RETURN @ID
END
GO
/****** Object:  StoredProcedure [dbo].[sp_getid_Marca]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_getid_Marca]
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Marca
	RETURN @ID
END
GO
/****** Object:  StoredProcedure [dbo].[sp_getid_Medicamento]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_getid_Medicamento]
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Medicamento
	RETURN @ID
END
GO
/****** Object:  StoredProcedure [dbo].[sp_getid_Pedido]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_getid_Pedido]
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Pedido
	RETURN @ID
END
GO
/****** Object:  StoredProcedure [dbo].[sp_getid_Provincia]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_getid_Provincia]
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = COUNT(*) FROM Provincia
	RETURN @ID
END
GO
/****** Object:  StoredProcedure [dbo].[sp_push_Cliente]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Cliente */
CREATE PROCEDURE [dbo].[sp_push_Cliente]
	@Cedula BIGINT,
	@Nombre VARCHAR(MAX),
	@Apellido1 VARCHAR(MAX),
	@Apellido2 VARCHAR(MAX),
	@Telefono BIGINT,
	@Tipo INT,
	@Provincia VARCHAR(MAX)
AS
BEGIN


	DECLARE @ID INT
	EXECUTE @ID = dbo.sp_getid_Cliente
	DECLARE @IdProvincia INT;
	SET @IdProvincia = 1;
	SELECT @IdProvincia=Id FROM Provincia WHERE Nombre=@Provincia;
	INSERT INTO Cliente(Id,Cedula,Nombre,Apellido1,Apellido2,Telefono,Tipo,IdProvincia)
	VALUES (@ID,@Cedula,@Nombre,@Apellido1,@Apellido2,@Telefono,@Tipo,@IdProvincia)





END
GO
/****** Object:  StoredProcedure [dbo].[sp_push_Empleado]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* Empleado */
CREATE PROCEDURE [dbo].[sp_push_Empleado]
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


	DECLARE @ID INT
	EXECUTE @ID = dbo.sp_getid_Empleado
	DECLARE @IdFarmacia INT;
	SET @IdFarmacia=0;
	SELECT @IdFarmacia=Id FROM Farmacia WHERE CedJuridica=@CedJurídica;
	PRINT (@IdFarmacia);
	INSERT INTO Empleado(Id, Nombre,Apellido1,Apellido2,Tipo,Estado,Correo,Contraseña,IdFarmacia)  
	VALUES (@ID,@Nombre,@Apellido1,@Apellido2,@Tipo,@Estado,@Correo,@Contraseña,@IdFarmacia)





END
GO
/****** Object:  StoredProcedure [dbo].[sp_push_Farmacia]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/* Farmacia*/
CREATE PROCEDURE [dbo].[sp_push_Farmacia]
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


	DECLARE @ID INT;
	EXECUTE @ID = dbo.sp_getid_Farmacia
	DECLARE @Ubicacion geography;
	SET @Ubicacion = geography::Point(@PuntoA, @PuntoB, '4326');
	DECLARE @IdProvincia INT;
	SET @IdProvincia=0;
	SELECT @IdProvincia=Id FROM Provincia WHERE Nombre=@Provincia;
	INSERT INTO Farmacia (Id, Nombre,CedJuridica,Ubicacion,Telefono,Correo,Horario,TotalRecaudado,IdProvincia)  
	VALUES (@ID,@Nombre,@CedJuridica,@Ubicacion,@Telefono,@Correo,@Horario,@TotalRecaudado,@IdProvincia)




END
GO
/****** Object:  StoredProcedure [dbo].[sp_push_FarmaciaXMedicamento]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_push_FarmaciaXMedicamento]
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
/****** Object:  StoredProcedure [dbo].[sp_push_FullPedido]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_push_FullPedido]  /******************* NEW PROC ***************************/
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
	EXECUTE sp_push_Pedido @Fecha,@Estado,@Monto,@Tipo,@CedulaCliente,@CedJuridica,@CodigoPedido;
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
END
GO
/****** Object:  StoredProcedure [dbo].[sp_push_Marca]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/***************** PUSH ******************/

/* Marca */
CREATE PROCEDURE [dbo].[sp_push_Marca]
	@Nombre VARCHAR(MAX)
AS
BEGIN
	DECLARE @ID INT
	EXECUTE @ID = dbo.sp_getid_Marca
	INSERT INTO Marca(Id, Nombre) VALUES (@ID, @Nombre)
END
GO
/****** Object:  StoredProcedure [dbo].[sp_push_Medicamento]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Medicamento */
CREATE PROCEDURE [dbo].[sp_push_Medicamento]
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


	DECLARE @ID INT
	EXECUTE @ID = dbo.sp_getid_Medicamento
	DECLARE @IdMarca INT;
	SET @IdMarca = 1;
	SELECT @IdMarca=Id FROM Marca WHERE Nombre=@Marca;
	INSERT INTO Medicamento(Id, Nombre,CodigoDeMedicamento,Descripcion,DosisNinos,DosisAdultos,EfectosSecundarios,Foto,Precio,Tipo,IdMarca)
	VALUES (@ID,@Nombre,@CodigoDeMedicamento,@Descripcion,@DosisNinos,@DosisAdultos,@EfectosSecundarios,@Foto,@Precio,@Tipo,@IdMarca)





END
GO
/****** Object:  StoredProcedure [dbo].[sp_push_Pedido]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Pedido */
CREATE PROCEDURE [dbo].[sp_push_Pedido]
	@Fecha DATE,
	@Estado INT,
	@Monto MONEY,
	@Tipo INT,
	@CedulaCliente BIGINT,
	@CedJuridica BIGINT,
	@CodigoPedido VARCHAR(MAX)
AS
BEGIN
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
	EXECUTE sp_update_MontoFarmacia @CedJuridica, @Monto

END
GO
/****** Object:  StoredProcedure [dbo].[sp_push_PedidoXMedicamento]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* PedidoXMedicamento*/
CREATE PROCEDURE [dbo].[sp_push_PedidoXMedicamento]
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
/****** Object:  StoredProcedure [dbo].[sp_push_Provincia]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* Provincia */
CREATE PROCEDURE [dbo].[sp_push_Provincia]
	@Nombre VARCHAR(MAX)
AS
BEGIN


	DECLARE @ID INT;
	EXECUTE @ID = dbo.sp_getid_Provincia
	INSERT INTO Provincia(Id, Nombre) VALUES (@ID, @Nombre)





END
GO
/****** Object:  StoredProcedure [dbo].[sp_update_CantidadDeMedicamentoEnPedido]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Actualizar cantidad de X medicamento en el pedido*/
CREATE PROCEDURE [dbo].[sp_update_CantidadDeMedicamentoEnPedido]
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
/****** Object:  StoredProcedure [dbo].[sp_update_EstadoPedido]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Cambiar estado del pedido */
CREATE PROCEDURE [dbo].[sp_update_EstadoPedido]
	@CodigoPedido VARCHAR(MAX),
	@Estado INT
AS
BEGIN

	
	UPDATE Pedido SET Estado=@Estado WHERE CodigoPedido=@CodigoPedido
	IF @Estado=2
	BEGIN 
		DECLARE @IdFarmacia INT;
		DECLARE @Monto MONEY; 
		SELECT @IdFarmacia=f.Id,@Monto=p.Monto FROM Farmacia f INNER JOIN Pedido p ON p.IdFarmacia=f.Id  WHERE p.CodigoPedido=@CodigoPedido;
		UPDATE Farmacia SET TotalRecaudado=TotalRecaudado+@Monto WHERE Id=@IdFarmacia;
	END 





END
GO
/****** Object:  StoredProcedure [dbo].[sp_update_FarmaciaXMedicamento_sin_fk]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* Actualizar stock */
CREATE PROCEDURE [dbo].[sp_update_FarmaciaXMedicamento_sin_fk]
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
/****** Object:  StoredProcedure [dbo].[sp_update_MontoFarmacia]    Script Date: 29/9/2019 18:20:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/**************** UPDATE *****************/

/* Cambiar monto total recaudado por sucursal */
CREATE PROCEDURE [dbo].[sp_update_MontoFarmacia]
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
USE [master]
GO
ALTER DATABASE [FarmaTEC] SET  READ_WRITE 
GO
