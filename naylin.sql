drop database if exists almacen;
create database almacen;

-- ddl

create table libro
(
    codigo          varchar(255) primary key,
    titulo          varchar(255),
    ano_publicacion date,
    editorial       varchar(255),
    precio          decimal,
    categoria       varchar(255)
);
create table persona
(
    solapin     varchar(255) primary key,
    provincia   varchar(255),
    nombre      varchar(255),
    correo      varchar(255),
    numero_tel  int,
    apartamento int
);
create table estudiante
(
    solapin varchar(255) primary key,
    ano     int,
    grupo   int,
    foreign key (solapin) references persona (solapin)
);
create table profesor
(
    solapin      varchar(255) primary key,
    departamento int,
    foreign key (solapin) references persona (solapin)
);
create table prestamo
(
    numero_prestamo int primary key,
    fecha_entrega   date,
    fecha_recogida  date,
    codigo          varchar(255),
    solapin         varchar(255),
    foreign key (codigo) references libro (codigo),
    foreign key (solapin) references persona (solapin)
);
create table autor
(
    id_autor   int primary key,
    nombre     varchar(255),
    sexo       char(1),
    pais_autor varchar(255)
);
create table perdida
(
    numero_perdida  int primary key,
    fecha_reporte   date,
    numero_prestamo int,
    foreign key (numero_prestamo) references prestamo (numero_prestamo)
);
create table autor_libro
(
    id_autor int,
    codigo   varchar(255),
    primary key (id_autor, codigo),
    foreign key (id_autor) references autor (id_autor),
    foreign key (codigo) references libro (codigo)
);


-- dml
insert into libro (codigo, titulo, ano_publicacion, editorial, precio, categoria)
values ('l001', 'introducción a la programación', '2020-01-01', 'editorial a', 29.99, 'informática'),
       ('l002', 'historia universal', '2018-05-15', 'editorial b', 39.99, 'historia'),
       ('l003', 'cocina italiana', '2019-10-10', 'editorial c', 24.99, 'cocina');
insert into persona (solapin, provincia, nombre, correo, numero_tel, apartamento)
values ('s001', 'ciudad', 'juan pérez', 'juan@example.com', 123456789, 101),
       ('s002', 'provincia', 'maría rodríguez', 'maria@example.com', 987654321, 202),
       ('s003', 'pueblo', 'carlos gómez', 'carlos@example.com', 555111222, 303);
insert into estudiante (solapin, ano, grupo)
values ('s001', 2022, 1),
       ('s002', 2023, 2),
       ('s003', 2022, 1);
insert into profesor (solapin, departamento)
values ('s003', 101);
insert into prestamo (numero_prestamo, fecha_entrega, fecha_recogida, codigo, solapin)
values (1, '2023-01-15', '2023-01-10', 'l001', 's001'),
       (2, '2023-02-20', '2023-02-15', 'l002', 's002'),
       (3, '2023-03-25', '2023-03-20', 'l003', 's003');
insert into autor (id_autor, nombre, sexo, pais_autor)
values (1, 'ana lópez', 'f', 'españa'),
       (2, 'david martínez', 'm', 'méxico'),
       (3, 'elena gómez', 'f', 'argentina');
insert into perdida (numero_perdida, fecha_reporte, numero_prestamo)
values (101, '2023-01-20', 1),
       (102, '2023-02-25', 2),
       (103, '2023-03-30', 3);
insert into autor_libro (id_autor, codigo)
values (1, 'l001'),
       (2, 'l002'),
       (3, 'l003');


-- eliminando datos de las tablas
delete
from perdida
where numero_perdida = 1;
delete
from autor_libro
where id_autor = 1
  and codigo = '968-444-419-2';
delete
from autor
where id_autor = 1;
delete
from prestamo
where numero_prestamo = 2;
delete
from profesor
where solapin = 'p324891';
delete
from estudiante
where solapin = 'e215141';
delete
from persona
where solapin = 'p324891';
delete
from persona
where solapin = 'e215141';
delete
from libro
where codigo = '968-444-419-2';



select *
from libro;
select *
from persona;
select *
from estudiante;
select *
from profesor;
select *
from prestamo;
select *
from autor;
select *
from autor_libro;
select *
from perdida;


-- obtener los préstamos realizados, incluyendo información sobre el libro prestado y la persona que lo solicitó.
select *
from persona
         join estudiante e on persona.solapin = e.solapin
         join prestamo p on persona.solapin = p.solapin
         join perdida p2 on p.numero_prestamo = p2.numero_prestamo;


-- monto tatal a pagar por cada persona que se le perdio el libro prestado
select sum(precio)
from prestamo
         join libro l on l.codigo = prestamo.codigo
         join persona p on prestamo.solapin = p.solapin;

-- numero total de prestamos
select count(*)
from prestamo;

-- mostrar la cantidad de libros por categoría, ordenados de mayor a menor.
select categoria, count(*)
from libro
group by categoria
order by count(*) desc;

-- mostrar los libros publicados despues del 2000 en orden alfabetico
select *
from libro
where ano_publicacion > '01/01/2000'
order by titulo;

-- obtener los primeros 5 estudiantes ordenados por año y grupo
select *
from estudiante
order by ano, grupo
limit 5;


-- mostrar los últimos 10 préstamos realizados
select *
from prestamo
order by fecha_entrega desc
limit 5;

-- crear una vista que muestre la información de los préstamos con detalles sobre el libro y la persona
create view vista_prestamos as
select p.numero_prestamo, p.fecha_entrega, p.fecha_recogida, l.titulo as libro, per.nombre as persona
from prestamo p
         join libro l on p.codigo = l.codigo
         join persona per on p.solapin = per.solapin;

