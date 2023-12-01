-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "persona" (
	"solapin" varchar(255) PRIMARY KEY NOT NULL,
	"provincia" varchar(255),
	"nombre" varchar(255),
	"correo" varchar(255),
	"numero_tel" integer,
	"apartamento" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "estudiante" (
	"solapin" varchar(255) PRIMARY KEY NOT NULL,
	"ano" integer,
	"grupo" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profesor" (
	"solapin" varchar(255) PRIMARY KEY NOT NULL,
	"departamento" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "libro" (
	"codigo" varchar(255) PRIMARY KEY NOT NULL,
	"titulo" varchar(255),
	"ano_publicacion" date,
	"editorial" varchar(255),
	"precio" numeric,
	"categoria" varchar(255),
	"idioma" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prestamo" (
	"numero_prestamo" integer PRIMARY KEY NOT NULL,
	"fecha_entrega" date,
	"fecha_recogida" date,
	"codigo" varchar(255),
	"solapin" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "perdida" (
	"numero_perdida" integer PRIMARY KEY NOT NULL,
	"fecha_reporte" date,
	"numero_prestamo" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "autor" (
	"id_autor" integer PRIMARY KEY NOT NULL,
	"nombre" varchar(255),
	"sexo" char(1),
	"pais_autor" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "autor_libro" (
	"id_autor" integer NOT NULL,
	"codigo" varchar(255) NOT NULL,
	CONSTRAINT autor_libro_pkey PRIMARY KEY("id_autor","codigo")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "estudiante" ADD CONSTRAINT "estudiante_solapin_fkey" FOREIGN KEY ("solapin") REFERENCES "persona"("solapin") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profesor" ADD CONSTRAINT "profesor_solapin_fkey" FOREIGN KEY ("solapin") REFERENCES "persona"("solapin") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prestamo" ADD CONSTRAINT "prestamo_codigo_fkey" FOREIGN KEY ("codigo") REFERENCES "libro"("codigo") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prestamo" ADD CONSTRAINT "prestamo_solapin_fkey" FOREIGN KEY ("solapin") REFERENCES "persona"("solapin") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "perdida" ADD CONSTRAINT "perdida_numero_prestamo_fkey" FOREIGN KEY ("numero_prestamo") REFERENCES "prestamo"("numero_prestamo") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "autor_libro" ADD CONSTRAINT "autor_libro_id_autor_fkey" FOREIGN KEY ("id_autor") REFERENCES "autor"("id_autor") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "autor_libro" ADD CONSTRAINT "autor_libro_codigo_fkey" FOREIGN KEY ("codigo") REFERENCES "libro"("codigo") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/