--Creacion de la BD
Create DataBase LuisDavidAncajimaValencia

--Creacion de las Tablas
CREATE TABLE Personal(
IdPersonal INT IDENTITY (1,1)  not null,
TipoDoc varchar(100),
NumeroDoc varchar(50),
ApPaterno varchar(255),
ApMaterno varchar(255),
Nombre1 varchar(255),
Nombre2 varchar(255),
FechaNac date,
FechaIngreso date,
)

ALTER TABLE Personal ADD CONSTRAINT PK_PERSONAL PRIMARY KEY(IdPersonal)

CREATE TABLE Hijo (
IdHijo INT IDENTITY (1,1)  not null,
IdPersonal INT,
TipoDoc varchar(100),
NumeroDoc varchar(50),
ApPaterno varchar(255),
ApMaterno varchar(255),
Nombre1 varchar(255),
Nombre2 varchar(255),
FechaNac date,
CONSTRAINT  FK_PERSONAL FOREIGN KEY (IdPersonal) REFERENCES Personal (IdPersonal)
)

ALTER TABLE Hijo ADD CONSTRAINT PK_HIJO PRIMARY KEY(IdHijo)

insert into Personal(TipoDoc,NumeroDoc,ApPaterno,ApMaterno,Nombre1,Nombre2,FechaNac,FechaIngreso)
values
	('DNI','71695896','Valverde','Sosa','Lorena','Ruth','1997-02-10','2023-08-15')

Select * from Personal

--Creacion de los Porcedimientos almacenados

create procedure sp_listaPersonal
as
begin 
	Select IdPersonal,TipoDoc,NumeroDoc,ApPaterno,ApMaterno,Nombre1,Nombre2,
	CONVERT(char(10),FechaNac,103)[FechaNac],
	CONVERT(char(10),FechaIngreso,103)[FechaIngreso]
	from Personal;
end

go



create procedure sp_listaHijo
as
begin 
	Select IdHijo,TipoDoc,NumeroDoc,ApPaterno,ApMaterno,Nombre1,Nombre2,
	CONVERT(char(10),FechaNac,103)[FechaNac],
	IdPersonal
	from Hijo;
end

go

create procedure sp_listaHijoPorPersonal(
@IdPersonal int
)
as
begin 
	Select IdHijo,TipoDoc,NumeroDoc,ApPaterno,ApMaterno,Nombre1,Nombre2,
	CONVERT(char(10),FechaNac,103)[FechaNac],
	IdPersonal
	from Hijo where  IdPersonal = @IdPersonal;
end

go



create procedure sp_obtenerPersonal(
@IdPersonal int
)
as
begin 
	Select IdPersonal,TipoDoc,NumeroDoc,ApPaterno,ApMaterno,Nombre1,Nombre2,
	CONVERT(char(10),FechaNac,103)[FechaNac],
	CONVERT(char(10),FechaIngreso,103)[FechaIngreso]
	from Personal where  IdPersonal = @IdPersonal
end

go

create procedure sp_obtenerHijo(
@IdHijo int
)
as
begin 
	Select IdHijo,TipoDoc,NumeroDoc,ApPaterno,ApMaterno,Nombre1,Nombre2,
	CONVERT(char(10),FechaNac,103)[FechaNac],
	IdPersonal
	from Hijo where  IdHijo = @IdHijo
end

go

create proc sp_crearPersonal(
@TipoDoc varchar(100),
@NumeroDoc varchar(50),
@ApPaterno varchar(50),
@ApMaterno varchar(50),
@Nombre1 varchar(50),
@Nombre2 varchar(50),
@FechaNac varchar(10),
@FechaIngreso varchar(10)
)
as 
begin
	set dateFormat dmy
	insert into Personal
	(TipoDoc,
	NumeroDoc,
	ApPaterno,
	ApMaterno,
	Nombre1,
	Nombre2,
	FechaNac,
	FechaIngreso)
	values
	(@TipoDoc,@NumeroDoc,@ApPaterno,@ApMaterno,@Nombre1,@Nombre2,
	convert (date ,@FechaNac),
	convert (date ,@FechaIngreso))
end

go

create proc sp_crearHijo(
@TipoDoc varchar(100),
@NumeroDoc varchar(50),
@ApPaterno varchar(50),
@ApMaterno varchar(50),
@Nombre1 varchar(50),
@Nombre2 varchar(50),
@FechaNac varchar(10),
@IdPersonal int
)
as 
begin
	set dateFormat dmy
	insert into Hijo
	(TipoDoc,
	NumeroDoc,
	ApPaterno,
	ApMaterno,
	Nombre1,
	Nombre2,
	FechaNac,
	IdPersonal)
	values
	(@TipoDoc,@NumeroDoc,@ApPaterno,@ApMaterno,@Nombre1,@Nombre2,
	convert (date ,@FechaNac),
	@IdPersonal)
end

go

create proc sp_EditarPersonal(
@IdPersonal int,
@TipoDoc varchar(100),
@NumeroDoc varchar(50),
@ApPaterno varchar(50),
@ApMaterno varchar(50),
@Nombre1 varchar(50),
@Nombre2 varchar(50),
@FechaNac varchar(10),
@FechaIngreso varchar(10)
)
as 
begin
	set dateFormat dmy
	update  Personal
	set TipoDoc = @TipoDoc,
	NumeroDoc = @NumeroDoc,
	ApPaterno = @ApPaterno,
	ApMaterno = @ApMaterno,
	Nombre1 = @Nombre1,
	Nombre2 = @Nombre2,
	FechaNac = convert(date ,@FechaNac),
	FechaIngreso = convert(date ,@FechaIngreso)
	where IdPersonal = @IdPersonal
end

go

create proc sp_EditarHijo(
@IdHijo int,
@TipoDoc varchar(100),
@NumeroDoc varchar(50),
@ApPaterno varchar(50),
@ApMaterno varchar(50),
@Nombre1 varchar(50),
@Nombre2 varchar(50),
@FechaNac varchar(10),
@IdPersonal int
)
as 
begin
	set dateFormat dmy
	update  Hijo
	set TipoDoc = @TipoDoc,
	NumeroDoc = @NumeroDoc,
	ApPaterno = @ApPaterno,
	ApMaterno = @ApMaterno,
	Nombre1 = @Nombre1,
	Nombre2 = @Nombre2,
	FechaNac = convert(date ,@FechaNac),
	IdPersonal = @IdPersonal
	where IdHijo = @IdHijo
end

go

create procedure sp_eliminarPersonal(
@IdPersonal int
)
as
begin
	delete from Personal where IdPersonal = @IdPersonal
end

go

create procedure sp_eliminarHijo(
@IdHijo int
)
as
begin
	delete from Hijo where IdHijo = @IdHijo
end

go
