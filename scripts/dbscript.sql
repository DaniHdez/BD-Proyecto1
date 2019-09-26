USE [master]
GO
/****** Object:  Database [FarmaTEC]    Script Date: 26/9/2019 07:14:17 ******/
CREATE DATABASE [FarmaTEC]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FarmaTEC', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\FarmaTEC.mdf' , SIZE = 51200KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
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
/****** Object:  Table [dbo].[Cliente]    Script Date: 26/9/2019 07:14:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Cedula] [bigint] NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Apellido1] [varchar](100) NOT NULL,
	[Apellido2] [varchar](100) NULL,
	[Telefono] [bigint] NOT NULL,
	[Tipo] [int] NOT NULL,
	[IdProvincia] [int] NOT NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Empleado]    Script Date: 26/9/2019 07:14:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empleado](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Apellido1] [varchar](100) NOT NULL,
	[Apellido2] [varchar](100) NULL,
	[Tipo] [int] NOT NULL,
	[Estado] [bit] NOT NULL,
	[Correo] [varchar](200) NOT NULL,
	[Contraseña] [varchar](200) NOT NULL,
 CONSTRAINT [PK_Empleado] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Farmacia]    Script Date: 26/9/2019 07:14:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Farmacia](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[CedJuridica] [bigint] NOT NULL,
	[Ubicacion] [geography] NOT NULL,
	[Telefono] [bigint] NOT NULL,
	[Correo] [varchar](200) NULL,
	[Horario] [varchar](300) NULL,
	[TotalRecaudado] [money] NOT NULL,
 CONSTRAINT [PK_Farmacia] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FarmaciaXMedicamento]    Script Date: 26/9/2019 07:14:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FarmaciaXMedicamento](
	[IdFarmacia] [int] NOT NULL,
	[IdMedicamento] [int] NOT NULL,
	[Stock] [int] NOT NULL,
 CONSTRAINT [PK_FarmaciaXMedicamento_1] PRIMARY KEY CLUSTERED 
(
	[IdFarmacia] ASC,
	[IdMedicamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Marca]    Script Date: 26/9/2019 07:14:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Marca](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Marca] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Medicamento]    Script Date: 26/9/2019 07:14:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicamento](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Descripcion] [varchar](200) NULL,
	[DosisNinos] [varchar](20) NULL,
	[DosisAdultos] [varchar](20) NULL,
	[EfectosSecundarios] [varchar](300) NULL,
	[Foto] [image] NULL,
	[Precio] [money] NOT NULL,
	[IdMarca] [int] NOT NULL,
	[Tipo] [int] NOT NULL,
 CONSTRAINT [PK_Medicamento] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pedido]    Script Date: 26/9/2019 07:14:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pedido](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[Estado] [int] NOT NULL,
	[Monto] [money] NOT NULL,
	[Tipo] [int] NOT NULL,
	[IdCliente] [int] NOT NULL,
	[IdFarmacia] [int] NOT NULL,
 CONSTRAINT [PK_Pedido] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PedidoXMedicamento]    Script Date: 26/9/2019 07:14:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PedidoXMedicamento](
	[Cantidad] [int] NOT NULL,
	[IdPedido] [int] NOT NULL,
	[IdMedicamento] [int] NOT NULL,
 CONSTRAINT [PK_PedidoXMedicamento_1] PRIMARY KEY CLUSTERED 
(
	[IdPedido] ASC,
	[IdMedicamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Provincia]    Script Date: 26/9/2019 07:14:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Provincia](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Provincia] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [U_Correo]    Script Date: 26/9/2019 07:14:18 ******/
CREATE UNIQUE NONCLUSTERED INDEX [U_Correo] ON [dbo].[Empleado]
(
	[Correo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [U_CedJuridica]    Script Date: 26/9/2019 07:14:18 ******/
CREATE UNIQUE NONCLUSTERED INDEX [U_CedJuridica] ON [dbo].[Farmacia]
(
	[CedJuridica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cliente]  WITH CHECK ADD  CONSTRAINT [FK_Cliente_Provincia] FOREIGN KEY([IdProvincia])
REFERENCES [dbo].[Provincia] ([Id])
GO
ALTER TABLE [dbo].[Cliente] CHECK CONSTRAINT [FK_Cliente_Provincia]
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
ALTER TABLE [dbo].[Medicamento]  WITH CHECK ADD  CONSTRAINT [FK_Medicamento_Medicamento] FOREIGN KEY([Id])
REFERENCES [dbo].[Medicamento] ([Id])
GO
ALTER TABLE [dbo].[Medicamento] CHECK CONSTRAINT [FK_Medicamento_Medicamento]
GO
ALTER TABLE [dbo].[Pedido]  WITH CHECK ADD  CONSTRAINT [FK_Pedido_Cliente] FOREIGN KEY([IdCliente])
REFERENCES [dbo].[Cliente] ([Id])
GO
ALTER TABLE [dbo].[Pedido] CHECK CONSTRAINT [FK_Pedido_Cliente]
GO
ALTER TABLE [dbo].[Pedido]  WITH CHECK ADD  CONSTRAINT [FK_Pedido_Cliente1] FOREIGN KEY([IdCliente])
REFERENCES [dbo].[Cliente] ([Id])
GO
ALTER TABLE [dbo].[Pedido] CHECK CONSTRAINT [FK_Pedido_Cliente1]
GO
ALTER TABLE [dbo].[Pedido]  WITH CHECK ADD  CONSTRAINT [FK_Pedido_Farmacia] FOREIGN KEY([IdFarmacia])
REFERENCES [dbo].[Farmacia] ([Id])
GO
ALTER TABLE [dbo].[Pedido] CHECK CONSTRAINT [FK_Pedido_Farmacia]
GO
ALTER TABLE [dbo].[Pedido]  WITH CHECK ADD  CONSTRAINT [FK_Pedido_Farmacia1] FOREIGN KEY([IdFarmacia])
REFERENCES [dbo].[Farmacia] ([Id])
GO
ALTER TABLE [dbo].[Pedido] CHECK CONSTRAINT [FK_Pedido_Farmacia1]
GO
ALTER TABLE [dbo].[PedidoXMedicamento]  WITH CHECK ADD  CONSTRAINT [FK_PedidoXMedicamento_Medicamento] FOREIGN KEY([IdMedicamento])
REFERENCES [dbo].[Medicamento] ([Id])
GO
ALTER TABLE [dbo].[PedidoXMedicamento] CHECK CONSTRAINT [FK_PedidoXMedicamento_Medicamento]
GO
ALTER TABLE [dbo].[PedidoXMedicamento]  WITH CHECK ADD  CONSTRAINT [FK_PedidoXMedicamento_Pedido] FOREIGN KEY([IdPedido])
REFERENCES [dbo].[Pedido] ([Id])
GO
ALTER TABLE [dbo].[PedidoXMedicamento] CHECK CONSTRAINT [FK_PedidoXMedicamento_Pedido]
GO
/****** Object:  StoredProcedure [dbo].[sp_get_MontoPromedioXClientesEnRango]    Script Date: 26/9/2019 07:14:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_get_MontoPromedioXClientesEnRango]
	@FechaInicial DATETIME,
	@FechaFinal DATETIME
AS
BEGIN
	DECLARE @Promedio INT;
	SET @Promedio = 0;
	SELECT @Promedio=SUM(Monto)/COUNT(Monto) FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial
END
GO
/****** Object:  StoredProcedure [dbo].[sp_get_PedidosEnRango]    Script Date: 26/9/2019 07:14:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_get_PedidosEnRango]
	@FechaInicial DATETIME,
	@FechaFinal DATETIME
AS
BEGIN
	SELECT Fecha,Estado,Monto,Tipo,IdCliente,IdFarmacia FROM Pedido WHERE Fecha<@FechaFinal AND Fecha>@FechaInicial
END
GO
USE [master]
GO
ALTER DATABASE [FarmaTEC] SET  READ_WRITE 
GO
