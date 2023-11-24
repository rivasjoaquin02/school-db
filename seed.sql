-- create database
drop database library_db;
create database library_db;


-- types
create type access_method as enum ('member card', 'provisional pass');
create type format as enum ('physical', 'digital');
create type doc_type as enum (
    'art', 'manuscript', 'ethnology', 'file', 'map', 'picture',
    'poster', 'media', 'music', 'reference', 'magazine', 'book');
create type service as enum (
    'loan', 'heritage preservation', 'cultural event',
    'consultation in a room', 'bibliographic references');
create type state as enum ('requested','approved', 'in-loan', 'renovated' ,'returned', 'non-returned', 'lost');
create type loan_type as enum ('loan_member', 'loan_library');
create type penalty as enum ('late fees', 'suspension of borrowing privileges', 'replacement cost', 'processing fee');
create type category as enum ('researcher', 'professional', 'student', 'foreign');

-- creating tables
create table library
(
    lib_id       bigserial    not null primary key,
    lib_name     varchar(100) not null unique,
    lib_location varchar(100) not null,
    postal_code  integer      not null,
    country      varchar(100)
);

create table room
(
    room_id         bigserial    not null primary key,
    lib_id          integer      not null,
    room_name       varchar(100) not null unique,
    room_location   varchar(100) not null,
    room_desc       text,
    access_method   access_method,
    phone_extension integer,
    constraint fk_library foreign key (lib_id) references library (lib_name)
);

create table collection
(
    col_id   bigserial not null primary key,
    room_id  integer,
    col_name varchar(100) unique,
    col_desc text,
    constraint fk_room foreign key (room_id) references room (room_id)
);

create table document_collection
(
    doc_id int not null,
    col_id int not null,
    constraint fk_document foreign key (doc_id) references document (doc_id),
    constraint fk_col foreign key (col_id) references collection (col_id)

);

create table document
(
    doc_id            bigserial not null primary key,
    title             varchar(100) unique,
    date_created      date      not null,
    editorial         varchar(100),
    publication_place varchar(100),
    language          varchar(100),
    format            format,
    subject           varchar(100),
    summary           text,
    is_patrimony      bool,
    doc_type          doc_type
);

create table art
(
    doc_id int not null primary key,
    constraint fk_document foreign key (doc_id) references document (doc_id)
);

create table manuscript
(
    doc_id int not null primary key,
    constraint fk_document foreign key (doc_id) references document (doc_id)
);

create table ethnology
(
    doc_id int not null primary key,
    constraint fk_document foreign key (doc_id) references document (doc_id)
);

create table file
(
    doc_id int not null primary key,
    constraint fk_document foreign key (doc_id) references document (doc_id)
);

create table map
(
    doc_id           int not null primary key,
    dimension_height int not null,
    dimension_width  int not null,
    constraint fk_document foreign key (doc_id) references document (doc_id)
);

create table picture
(
    doc_id           int not null primary key,
    dimension_height int not null,
    dimension_width  int not null,
    constraint fk_document foreign key (doc_id) references document (doc_id)
);

create table poster
(
    doc_id           int not null primary key,
    technique        varchar(100),
    dimension_height int not null,
    dimension_width  int not null,
    constraint fk_document foreign key (doc_id) references document (doc_id)
);

create table media
(
    doc_id         int not null primary key,
    genre          varchar(100),
    director_id    int,
    "productor_id" int,
    duration       int,
    constraint fk_document foreign key (doc_id) references document (doc_id),
    constraint fk_director foreign key (director_id) references person (ci),
    constraint fk_productor foreign key (productor_id) references person (ci)
);

create table music
(
    doc_id         int not null primary key,
    genre          varchar(100),
    interpreter_id int,
    composer_id    int,
    duration       int,
    constraint fk_document foreign key (doc_id) references document (doc_id),
    constraint fk_interpreter foreign key (doc_id) references person (ci),
    constraint fk_composer foreign key (composer_id) references person (ci)
);

create table reference
(
    doc_id int not null primary key,
    serial int,
    constraint fk_document foreign key (doc_id) references document (doc_id)
);

create table magazine
(
    doc_id    int not null primary key,
    editor_id int,
    constraint fk_document foreign key (doc_id) references document (doc_id),
    constraint fk_editor foreign key (editor_id) references person (ci)
);

create table book
(
    doc_id int not null primary key,
    genre  varchar(100),
    "issn" int,
    constraint fk_document foreign key (doc_id) references document (doc_id)
);

create table phone
(
    phone      int not null primary key,
    phone_desc varchar(100)
);

create table phone_library
(
    phone  int not null primary key,
    lib_id int not null,
    constraint fk_phone foreign key (phone) references phone (phone),
    constraint fk_library foreign key (lib_id) references library (lib_name)
);

create table phone_room
(
    phone   int not null primary key,
    room_id int not null,
    constraint fk_phone foreign key (phone) references phone (phone),
    constraint fk_room foreign key (room_id) references room (room_id)
);

create table email
(
    email      int not null primary key,
    email_desc varchar(100)
);

create table email_library
(
    email  int not null primary key,
    lib_id int not null,
    constraint fk_email foreign key (email) references email (email),
    constraint fk_library foreign key (lib_id) references library (lib_name)
);

create table email_room
(
    email   int not null primary key,
    room_id int not null,
    constraint fk_email foreign key (email) references email (email),
    constraint fk_room foreign key (room_id) references room (room_id)
);

create table email_collection
(
    email  int not null primary key,
    col_id int not null,
    constraint fk_email foreign key (email) references email (email),
    constraint fk_collection foreign key (col_id) references collection (col_id)
);

create table author
(
    author_id bigserial not null primary key,
    ci        int,
    constraint fk_person foreign key (ci) references person (ci)
);

create table person
(
    ci   uuid not null primary key,
    name varchar(100),
    age  int
);

create table document_author
(
    doc_id    int not null primary key,
    author_id int not null primary key,
    constraint fk_document foreign key (doc_id) references document (doc_id),
    constraint fk_author foreign key (author_id) references author (author_id)
);

create table service
(
    service_id   int not null primary key,
    service_desc text,
    service_type service
);

create table room_service
(
    room_id    int not null primary key,
    service_id int not null primary key,
    constraint fk_room foreign key (room_id) references room (room_id),
    constraint fk_service foreign key (service_id) references service (service_id)
);

create table loan
(
    service_id int not null primary key,
    term       int,
    start_date date,
    end_date   date,
    state      state,
    loan_type  loan_type
);

create table fine
(
    fine_id int not null primary key,
    penalty penalty
);

create table loan_fine
(
    service_id int not null primary key,
    fine_id    int not null primary key,
    constraint fk_service foreign key (service_id) references service (service_id),
    constraint fk_fine foreign key (fine_id) references fine (fine_id)
);

create table loan_library
(
    service_id int not null primary key,
    doc_id     int not null primary key,
    lib_id     int not null primary key,
    lib_id2    int not null primary key,
    constraint fk_service foreign key (service_id) references service (service_id),
    constraint fk_document foreign key (doc_id) references document (doc_id),
    constraint fk_library foreign key (lib_id) references library (lib_id),
    constraint fk_library2 foreign key (lib_id2) references library (lib_id)
);

create table loan_member
(
    service_id int null primary key,
    doc_id     int not null primary key,
    member_id  int not null primary key,
    constraint fk_service foreign key (service_id) references service (service_id),
    constraint fk_document foreign key (doc_id) references document (doc_id),
    constraint fk_member foreign key (member_id) references member (member_id)
);

create table member
(
    member_id int null primary key,
    ci        int null,
    category  category,
    constraint fk_people foreign key (ci) references person (ci)
);

create table researcher
(
    member_id int null primary key,
    constraint fk_member foreign key (member_id) references member (member_id)
);

create table professional
(
    member_id int null primary key,
    constraint fk_member foreign key (member_id) references member (member_id)
);

create table student
(
    member_id int null primary key,
    constraint fk_member foreign key (member_id) references member (member_id)
);

create table "foreign"
(
    member_id int null primary key,
    constraint fk_member foreign key (member_id) references member (member_id)
);


-- inserts

INSERT INTO library (lib_name, lib_location, postal_code, country)
VALUES ('Biblioteca Nacional José Martí', 'Plaza de la Revolución, La Habana', 10600, 'Cuba'),
       ('Biblioteca Provincial Rubén Martínez Villena', 'Sancti Spíritus', 60100, 'Cuba'),
       ('Biblioteca Provincial Julio Antonio Mella', 'Camagüey', 70100, 'Cuba'),
       ('Biblioteca Provincial Martí', 'Santa Clara, Villa Clara', 50100, 'Cuba'),
       ('Biblioteca Provincial Elvira Cape', 'Santiago de Cuba', 90100, 'Cuba');

INSERT INTO room (lib_id, room_name, room_location, room_desc, access_method, phone_extension)
VALUES (1, 'Sala de Lectura General', 'Planta baja', 'Sala principal de lectura', 'member card', 101),
       (1, 'Sala de Niños', 'Primer piso', 'Sala de lectura para niños', 'member card', 102),
       (1, 'Sala de Música', 'Segundo piso', 'Sala dedicada a la música', 'member card', 103),
       (1, 'Sala de Arte', 'Tercer piso', 'Sala dedicada al arte', 'member card', 104),
       (1, 'Sala de Referencia', 'Cuarto piso', 'Sala de consulta de referencias', 'member card', 105);

INSERT INTO collection (room_id, col_name, col_desc)
VALUES (1, 'Colección de Historia de Cuba', 'Libros y documentos sobre la historia de Cuba'),
       (2, 'Colección de Literatura Infantil', 'Libros de cuentos y novelas para niños'),
       (3, 'Colección de Música Cubana', 'Partituras y grabaciones de música cubana'),
       (4, 'Colección de Arte Cubano', 'Libros y catálogos de arte cubano'),
       (5, 'Colección de Referencia', 'Diccionarios, enciclopedias y otros materiales de referencia');

INSERT INTO document_collection (doc_id, col_id)
VALUES (1, 1),
       (2, 2),
       (3, 1);

INSERT INTO document (title, date_created, editorial, publication_place, language, format, subject, summary,
                      is_patrimony, doc_type)
VALUES ('Historia de Cuba', '2023-01-01', 'Editorial Nacional', 'La Habana', 'Español', 'physical', 'Historia',
        'Un libro sobre la historia de Cuba', false, 'book'),
       ('Cuentos para niños', '2023-01-01', 'Editorial Infantil', 'La Habana', 'Español', 'physical',
        'Literatura infantil', 'Un libro de cuentos para niños', false, 'book'),
       ('Música Cubana', '2023-01-01', 'Editorial Musical', 'La Habana', 'Español', 'digital', 'Música',
        'Una grabación de música cubana', false, 'music');

INSERT INTO art (doc_id)
VALUES (1),
       (2),
       (3);

INSERT INTO manuscript (doc_id)
VALUES (1),
       (2),
       (3);

INSERT INTO ethnology (doc_id)
VALUES (1),
       (2),
       (3);

INSERT INTO file (doc_id)
VALUES (1),
       (2),
       (3);

INSERT INTO map (doc_id, dimension_height, dimension_width)
VALUES (1, 100, 100),
       (2, 100, 100),
       (3, 100, 100);

INSERT INTO picture (doc_id, dimension_height, dimension_width)
VALUES (1, 100, 100),
       (2, 100, 100),
       (3, 100, 100);

INSERT INTO poster (doc_id, technique, dimension_height, dimension_width)
VALUES (1, 'Impresión', 100, 100),
       (2, 'Impresión', 100, 100),
       (3, 'Impresión', 100, 100);

INSERT INTO media (doc_id, genre, director_id, productor_id, duration)
VALUES (1, 'Documental', 1, 1, 60),
       (2, 'Animación', 2, 2, 30),
       (3, 'Música', 3, 3, 45);

INSERT INTO music (doc_id, genre, interpreter_id, composer_id, duration)
VALUES (1, 'Son Cubano', 1, 1, 60),
       (2, 'Bolero', 2, 2, 45),
       (3, 'Guajira', 3, 3, 50);

INSERT INTO reference (doc_id, serial)
VALUES (1, 1),
       (2, 2),
       (3, 3);

INSERT INTO magazine (doc_id, editor_id)
VALUES (1, 1),
       (2, 2),
       (3, 3);

INSERT INTO book (doc_id, genre, issn)
VALUES (1, 'Historia', 1),
       (2, 'Literatura infantil', 2),
       (3, 'Música', 3);

INSERT INTO phone (phone, phone_desc)
VALUES (78320101, 'Teléfono principal'),
       (78320102, 'Teléfono de la sala de lectura'),
       (78320103, 'Teléfono de la sala de niños');

INSERT INTO phone_library (phone, lib_id)
VALUES (78320101, 1),
       (78320102, 1),
       (78320103, 1);

INSERT INTO phone_room (phone, room_id)
VALUES (78320102, 1),
       (78320103, 2);


create table email
(
    email      int not null primary key,
    email_desc varchar(100)
);

INSERT INTO email (email, email_desc)
VALUES ('info@bnjm.cu', 'Correo electrónico principal'),
       ('salalectura@bnjm.cu', 'Correo electrónico de la sala de lectura'),
       ('salaniños@bnjm.cu', 'Correo electrónico de la sala de niños');

INSERT INTO email_library (email, lib_id)
VALUES ('info@bnjm.cu', 1),
       ('salalectura@bnjm.cu', 1),
       ('salaniños@bnjm.cu', 1);

INSERT INTO email_room (email, room_id)
VALUES ('salalectura@bnjm.cu', 1),
       ('salaniños@bnjm.cu', 2);

INSERT INTO email_collection (email, col_id)
VALUES ('salalectura@bnjm.cu', 1),
       ('salaniños@bnjm.cu', 2);

INSERT INTO person (ci, name, age)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'José Martí', 42),
       ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Alejo Carpentier', 75),
       ('6ba7b810-9dad-11d1-80b4-00c04fd430c9', 'Nicolás Guillén', 89),
       ('6ba7b810-9dad-11d1-80b4-00c04fd430c7', 'Dulce María Loynaz', 94),
       ('6ba7b810-9dad-11d1-80b4-00c04fd430c6', 'Reinaldo Arenas', 47);

INSERT INTO author (ci)
VALUES ('550e8400-e29b-41d4-a716-446655440000'),
       ('6ba7b810-9dad-11d1-80b4-00c04fd430c8'),
       ('6ba7b810-9dad-11d1-80b4-00c04fd430c9'),
       ('6ba7b810-9dad-11d1-80b4-00c04fd430c7'),
       ('6ba7b810-9dad-11d1-80b4-00c04fd430c6');

INSERT INTO document_author (doc_id, author_id)
VALUES (1, 1),
       (2, 2),
       (3, 3);

INSERT INTO service (service_id, service_desc, service_type)
VALUES (1, 'Préstamo de libros', 'loan'),
       (2, 'Preservación del patrimonio', 'heritage preservation'),
       (3, 'Evento cultural', 'cultural event'),
       (4, 'Consulta en sala', 'consultation in a room'),
       (5, 'Referencias bibliográficas', 'bibliographic references');

INSERT INTO room_service (room_id, service_id)
VALUES (1, 1),
       (1, 4),
       (1, 5),
       (2, 1),
       (2, 4);

INSERT INTO loan (service_id, term, start_date, end_date, state, loan_type)
VALUES (1, 30, '2023-01-01', '2023-01-31', 'approved', 'loan_member'),
       (2, 30, '2023-01-01', '2023-01-31', 'approved', 'loan_member'),
       (3, 30, '2023-01-01', '2023-01-31', 'approved', 'loan_member');

INSERT INTO fine (fine_id, penalty)
VALUES (1, 'late fees'),
       (2, 'replacement cost'),
       (3, 'processing fee');

INSERT INTO loan_fine (service_id, fine_id)
VALUES (1, 1),
       (2, 2),
       (3, 3);

INSERT INTO loan_library (service_id, doc_id, lib_id, lib_id2)
VALUES (1, 1, 1, 1),
       (2, 2, 1, 1),
       (3, 3, 1, 1);

INSERT INTO loan_member (service_id, doc_id, member_id)
VALUES (1, 1, 1),
       (2, 2, 2),
       (3, 3, 3);


INSERT INTO person (ci, name, age)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Juan Pérez', 42),
       ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'María Rodríguez', 35),
       ('6ba7b810-9dad-11d1-80b4-00c04fd430c9', 'Carlos López', 28),
       ('6ba7b810-9dad-11d1-80b4-00c04fd430c7', 'Ana Martínez', 31),
       ('6ba7b810-9dad-11d1-80b4-00c04fd430c6', 'Pedro Gómez', 45);

INSERT INTO member (member_id, ci, category)
VALUES (1, '550e8400-e29b-41d4-a716-446655440000', 'researcher'),
       (2, '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'professional'),
       (3, '6ba7b810-9dad-11d1-80b4-00c04fd430c9', 'student'),
       (4, '6ba7b810-9dad-11d1-80b4-00c04fd430c7', 'foreign'),
       (5, '6ba7b810-9dad-11d1-80b4-00c04fd430c6', 'researcher');

INSERT INTO researcher (member_id)
VALUES (1),
       (5);

INSERT INTO professional (member_id)
VALUES (2);

INSERT INTO student (member_id)
VALUES (3);

INSERT INTO "foreign" (member_id)
VALUES (4);


-- updates

