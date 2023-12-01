import {
	pgTable,
	varchar,
	integer,
	date,
	numeric,
	serial,
	char,
	primaryKey,
} from "drizzle-orm/pg-core";

export const persona = pgTable("persona", {
	solapin: varchar("solapin", { length: 255 }).primaryKey().notNull(),
	provincia: varchar("provincia", { length: 255 }),
	nombre: varchar("nombre", { length: 255 }),
	correo: varchar("correo", { length: 255 }),
	numeroTel: integer("numero_tel"),
	apartamento: integer("apartamento"),
});

export const estudiante = pgTable("estudiante", {
	solapin: varchar("solapin", { length: 255 })
		.primaryKey()
		.notNull()
		.references(() => persona.solapin),
	ano: integer("ano"),
	grupo: integer("grupo"),
});

export const profesor = pgTable("profesor", {
	solapin: varchar("solapin", { length: 255 })
		.primaryKey()
		.notNull()
		.references(() => persona.solapin),
	departamento: varchar("departamento", { length: 255 }),
});

export const libro = pgTable("libro", {
	codigo: varchar("codigo", { length: 255 }).primaryKey().notNull(),
	titulo: varchar("titulo", { length: 255 }),
	anoPublicacion: date("ano_publicacion"),
	editorial: varchar("editorial", { length: 255 }),
	precio: numeric("precio"),
	categoria: varchar("categoria", { length: 255 }),
	idioma: varchar("idioma", { length: 255 }),
});

export const prestamo = pgTable("prestamo", {
	numeroPrestamo: serial("numero_prestamo").primaryKey().notNull(),
	fechaEntrega: date("fecha_entrega"),
	fechaRecogida: date("fecha_recogida"),
	codigo: varchar("codigo", { length: 255 }).references(() => libro.codigo),
	solapin: varchar("solapin", { length: 255 }).references(
		() => persona.solapin
	),
});

export const perdida = pgTable("perdida", {
	numeroPerdida: serial("numero_perdida").primaryKey().notNull(),
	fechaReporte: date("fecha_reporte"),
	numeroPrestamo: integer("numero_prestamo").references(
		() => prestamo.numeroPrestamo
	),
});

export const autor = pgTable("autor", {
	idAutor: serial("id_autor").primaryKey().notNull(),
	nombre: varchar("nombre", { length: 255 }),
	sexo: char("sexo", { length: 1 }),
	paisAutor: varchar("pais_autor", { length: 255 }),
});

export const autorLibro = pgTable(
	"autor_libro",
	{
		idAutor: serial("id_autor")
			.notNull()
			.references(() => autor.idAutor),
		codigo: varchar("codigo", { length: 255 })
			.notNull()
			.references(() => libro.codigo),
	},
	(table) => {
		return {
			autorLibroPkey: primaryKey({
				columns: [table.idAutor, table.codigo],
				name: "autor_libro_pkey",
			}),
		};
	}
);

export type PersonaInsert = typeof persona.$inferInsert;
export type EstudianteInsert = typeof estudiante.$inferInsert;
export type ProfesorInsert = typeof profesor.$inferInsert;
export type LibroInsert = typeof libro.$inferInsert;
export type PrestamoInsert = typeof prestamo.$inferInsert;
export type PerdidaInsert = typeof perdida.$inferInsert;
export type AutorInsert = typeof autor.$inferInsert;
export type AutorLibroInsert = typeof autorLibro.$inferInsert;

export type PersonaSelect = typeof persona.$inferSelect;
export type EstudianteSelect = typeof estudiante.$inferSelect;
export type ProfesorSelect = typeof profesor.$inferSelect;
export type LibroSelect = typeof libro.$inferSelect;
export type PrestamoSelect = typeof prestamo.$inferSelect;
export type PerdidaSelect = typeof perdida.$inferSelect;
export type AutorSelect = typeof autor.$inferSelect;
export type AutorLibroSelect = typeof autorLibro.$inferSelect;
