/* POPULATE DATABASE */

USE FarmaTEC2
GO

/* POBLANDO Provincia */
EXECUTE sp_push_Provincia 'San José';
EXECUTE sp_push_Provincia 'Heredia';
EXECUTE sp_push_Provincia 'Cartago';
EXECUTE sp_push_Provincia 'Alajuela';
EXECUTE sp_push_Provincia 'Puntarenas';
EXECUTE sp_push_Provincia 'Guanacaste';
EXECUTE sp_push_Provincia 'Limón';
/* POBLANDO Marca*/
EXECUTE sp_push_Marca 'Adenuric';
EXECUTE sp_push_Marca 'Balzak';
EXECUTE sp_push_Marca 'Disgren';
EXECUTE sp_push_Marca 'Enantyum';
EXECUTE sp_push_Marca 'GSK';
EXECUTE sp_push_Marca 'Pfizer';
EXECUTE sp_push_Marca 'Panadol';
/* POBLANDO Farmacia */
EXECUTE sp_push_Farmacia 'La Bomba',384612874,'9.932004','-84.051840',223465563,'labomba@servicioalcliente.com','Lunes a Viernes de 9:00am a 9:00pm',₡0.00,'Heredia';
EXECUTE sp_push_Farmacia 'La Arboleda',378659898,'9.859968','-83.922104',23239090,'laarboleda@servicioalcliente.com','Lunes a Domingo de 6:00am a 10:00pm',₡0.00,'Cartago';
EXECUTE sp_push_Farmacia 'La Fischel',377768778,'9.979405','-84.089527',22546754,'lafischel@servicioalcliente.com','Lunes a Sábado de 7:00am a 8:00pm',₡0.00,'San José';
/* POBLANDO Medicamento */
DECLARE @Img1 VARBINARY(MAX);
DECLARE @Img2 VARBINARY(MAX);
DECLARE @Img3 VARBINARY(MAX);
DECLARE
SET @Img1=(SELECT * FROM OPENROWSET(BULK N'C:\Users\alecastrillo\Pictures\enantyum.jpg', SINGLE_BLOB) AS Img1);
SET @Img2=(SELECT * FROM OPENROWSET(BULK N'C:\Users\alecastrillo\Pictures\paracetamol.jpeg', SINGLE_BLOB) as Img2);
SET @Img3=(SELECT * FROM OPENROWSET(BULK N'C:\Users\alecastrillo\Pictures\viagra.jpg', SINGLE_BLOB) as Img3)
SELECT * FROM Farmacia
EXECUTE sp_push_Medicamento 'Enantyum Gel','MED20190001','Analgésico perteneciente al grupo de medicamentos denominados antiinflamatorios no esteroideos (AINE).','0','1 cada 8h','Náuseas, vómitos, diarrea y dolor o ardor de estómago.',@Img1,₡1500,'Analgésico','Enantyum';
EXECUTE sp_push_Medicamento 'Paracetamol','MED20190010','Fármaco con propiedades analgésicas y antipiréticas utilizado principalmente para tratar la fiebre, y el dolor leve y moderado.','10 a 15 mg (3 a 5 gotas) por kilo de peso','1 o medio comprimido (1 g-500 mg) cada mínimo 4h.','Se pueden manifestar con síntomas como fatiga inusual, anorexia, náuseas y/o vómitos, dolor abdominal, ictericia, orina oscura o deposiciones blanquecinas.',@Img2,₡200,'Analgésico y antipirético','Panadol';
EXECUTE sp_push_Medicamento 'Viagra','MED20190101','Sustancia usada para tratar la disfunción eréctil.','0','1 cada 8h','Dolor de cabeza, enrojecimiento, dispepsia, trastornos visuales, como distorsión de la visión de los colores y visión borrosa.',@Img3,₡3000,'Inhibidores','Pfizer';
/* POBLANDO Empleado */
EXECUTE sp_push_Empleado 'Juan','Castillo','Rojas',1,1,'juancastillorojas@gmail.com','contrasenadejuan',384612874;
EXECUTE sp_push_Empleado 'María','Gómez','Castro',2,1,'mariagomezcastro@gmail.com','contrasenademaria',378659898;
EXECUTE sp_push_Empleado 'Alberto','Rodriguez','Torres',3,1,'albertorodrigueztorres@gmail.com','contrasenadealberto',377768778;
/* POBLANDO Cliente*/
EXECUTE sp_push_Cliente 116892238, 'Ricardo','Jiménez','Muñoz','88776655',1,'San José'
EXECUTE sp_push_Cliente 109988787, 'Carla','Camacho','Hidalgo','68554334',2,'San José'
EXECUTE sp_push_Cliente 345547890, 'Manuel','Jiménez','Valvere','89898989',3,'Cartago'
EXECUTE sp_push_Cliente 398677655, 'Jimena','Mora','Fernández','67676767',1,'Cartago'
EXECUTE sp_push_Cliente 207748833, 'Daniela','Masis','Céspedes','64545454',2,'Heredia'
EXECUTE sp_push_Cliente 223443458, 'Emily','Arredondo','Nuñez','89786756',3,'Heredia'
/* POBLANDO FarmaciaXMedicamento */
EXECUTE sp_push_FarmaciaXMedicamento 384612874,'MED20190001',100
EXECUTE sp_push_FarmaciaXMedicamento 384612874,'MED20190010',100
EXECUTE sp_push_FarmaciaXMedicamento 384612874,'MED20190101',100
EXECUTE sp_push_FarmaciaXMedicamento 378659898,'MED20190001',100
EXECUTE sp_push_FarmaciaXMedicamento 378659898,'MED20190010',100
EXECUTE sp_push_FarmaciaXMedicamento 378659898,'MED20190101',100
EXECUTE sp_push_FarmaciaXMedicamento 377768778,'MED20190001',100
EXECUTE sp_push_FarmaciaXMedicamento 377768778,'MED20190010',100
EXECUTE sp_push_FarmaciaXMedicamento 377768778,'MED20190101',100
/* POBLANDO FULL Pedido */
EXECUTE sp_push_FullPedido '01/01/19 22:23:33.666',1,₡5500,'PED20180001',1,116892238,384612874,'MED20190001,MED20190010,MED20190101,','1,5,1,'
EXECUTE sp_push_FullPedido '07/01/19 22:23:33.666',1,₡1200,'PED20180001',1,116892238,377768778,'MED20190010,','6,'
EXECUTE sp_push_FullPedido '01/01/19 22:23:33.666',1,₡400,'PED20180001',1,109988787,378659898,'MED20190010,','2,'
EXECUTE sp_push_FullPedido '02/01/19 22:23:33.666',1,₡1200,'PED20180001',1,109988787,384612874,'MED20190010,','1,'
EXECUTE sp_push_FullPedido '03/01/19 22:23:33.666',1,₡4500,'PED20180001',1,116892238,378659898,'MED20190101,','3,'
EXECUTE sp_push_FullPedido '01/02/19 22:23:33.666',1,₡5500,'PED20180001',1,116892238,384612874,'MED20190001,MED20190010,MED20190101,','1,5,1,'
EXECUTE sp_push_FullPedido '07/02/19 22:23:33.666',1,₡1200,'PED20180001',1,116892238,378659898,'MED20190010,','6,'
EXECUTE sp_push_FullPedido '01/02/19 22:23:33.666',1,₡400,'PED20180001',1,109988787,378659898,'MED20190010,','2,'
EXECUTE sp_push_FullPedido '02/02/19 22:23:33.666',1,₡1200,'PED20180001',1,109988787,377768778,'MED20190010,','1,'
EXECUTE sp_push_FullPedido '03/02/19 22:23:33.666',1,₡4500,'PED20180001',1,116892238,384612874,'MED20190101,','3,'
