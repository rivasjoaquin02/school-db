import {
	pgTable,
	integer,
	text,
	varchar,
	date,
	boolean,
} from "drizzle-orm/pg-core";
import {
	document_type,
	format_type,
	map_type,
	pickRandom,
	technique_type,
} from "./enums";
import { collection, generateIdCollection } from "./collection";
import { Faker } from "@faker-js/faker";

export const document = pgTable("document", {
	id_document: integer("id_document").notNull().primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	created_at: date("created_at"),
	editorial: varchar("editorial", { length: 255 }),
	publication_place: varchar("publication_place", { length: 255 }),
	language: varchar("language", { length: 50 }),
	format: format_type("format_type"),
	subject: varchar("subject", { length: 255 }),
	summary: text("summary"),
	is_patrimony: boolean("is_patrimony"),
	note: text("note"),
	type_document: document_type("document_type"),
});

export type Document = typeof document.$inferInsert;

export const document_collection = pgTable("document_collection", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	id_collection: varchar("id_collection", { length: 10 })
		.notNull()
		.primaryKey()
		.references(() => collection.id_collection),
});

export type DocumentCollection = typeof document_collection.$inferInsert;

export const manuscript = pgTable("manuscript", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	period: varchar("period", { length: 100 }),
});

export type Manuscript = typeof manuscript.$inferInsert;

export const map = pgTable("map", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	dimension_height: integer("dimension_height").notNull(),
	dimension_width: integer("dimension_width").notNull(),
	scale: varchar("scale", { length: 20 }),
	type_map: map_type("map_type").notNull(),
});

export type Map = typeof map.$inferInsert;

export const picture = pgTable("picture", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	dimension_height: integer("dimension_height").notNull(),
	dimension_width: integer("dimension_width").notNull(),
});

export type Picture = typeof picture.$inferInsert;

export const paint = pgTable("paint", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	technique: technique_type("technique_type").notNull(),
	dimension_height: integer("dimension_height").notNull(),
	dimension_width: integer("dimension_width").notNull(),
});

export type Paint = typeof paint.$inferInsert;

export const media = pgTable("media", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	genre: varchar("genre", { length: 100 }),
	director: varchar("director", { length: 100 }),
	producer: varchar("producer", { length: 100 }),
	duration: integer("duration"),
});

export type Media = typeof media.$inferInsert;

export const music = pgTable("music", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	genre: varchar("genre", { length: 100 }),
	performer: varchar("performer", { length: 100 }),
	composer: varchar("composer", { length: 100 }),
	duration: integer("duration"),
});

export type Music = typeof music.$inferInsert;

export const reference = pgTable("reference", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	serial: integer("serial"),
});

export type Reference = typeof reference.$inferInsert;

export const magazine = pgTable("magazine", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	editor: varchar("editor", { length: 100 }),
	issn: varchar("issn", { length: 20 }),
});

export type Magazine = typeof magazine.$inferInsert;

export const book = pgTable("book", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	genre: varchar("genre", { length: 50 }),
	issn: varchar("issn", { length: 20 }),
	isbn: varchar("isbn", { length: 20 }),
	dewey: integer("dewey"),
});

export type Book = typeof book.$inferInsert;

export const generateDocument = (faker: Faker): Document => {
	return {
		id_document: faker.number.int(),
		title: faker.lorem.sentence(10),
		created_at: faker.date.past().toString(),
		editorial: faker.company.name(),
		publication_place: faker.location.city(),
		language: pickRandom(["es", "en", "fr", "de", "it", "ru"]),
		format: pickRandom(format_type.enumValues),
		subject: faker.lorem.sentence(10),
		summary: faker.lorem.paragraph(10),
		is_patrimony: faker.datatype.boolean(),
		note: faker.lorem.paragraph(10),
		type_document: pickRandom(document_type.enumValues),
	};
};

export const generateDocument_collection = (
	faker: Faker
): DocumentCollection => {
	return {
		id_document: faker.number.int(10000),
		id_collection: generateIdCollection(faker),
	};
};

export const generateManuscript = (faker: Faker): Manuscript => {
	return {
		id_document: faker.number.int(10000),
		period: faker.lorem.sentence(10),
	};
};
export const generateMap = (faker: Faker): Map => {
	return {
		id_document: faker.number.int(10000),
		dimension_height: faker.number.int(10000),
		dimension_width: faker.number.int(10000),
		scale: `${faker.number.int(1000)}:${faker.number.int(1000)}`,
		type_map: pickRandom(map_type.enumValues),
	};
};
export const generatePicture = (faker: Faker): Picture => {
	return {
		id_document: faker.number.int(10000),
		dimension_height: faker.number.int(10000),
		dimension_width: faker.number.int(10000),
	};
};

export const generatePaint = (faker: Faker): Paint => {
	return {
		id_document: faker.number.int(10000),
		technique: pickRandom(technique_type.enumValues),
		dimension_height: faker.number.int(10000),
		dimension_width: faker.number.int(10000),
	};
};
export const generateMedia = (faker: Faker): Media => {
	return {
		id_document: faker.number.int(10000),
		genre: faker.lorem.sentence(10),
		director: faker.person.fullName(),
		producer: faker.person.fullName(),
		duration: faker.number.int(10000),
	};
};
export const generateMusic = (faker: Faker): Music => {
	return {
		id_document: faker.number.int(10000),
		genre: faker.lorem.sentence(10),
		performer: faker.person.fullName(),
		composer: faker.person.fullName(),
		duration: faker.number.int(10000),
	};
};
export const generateReference = (faker: Faker): Reference => {
	return {
		id_document: faker.number.int(10000),
		serial: faker.number.int(10000),
	};
};
export const generateMagazine = (faker: Faker): Magazine => {
	return {
		id_document: faker.number.int(10000),
		editor: faker.person.fullName(),
		issn: `${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int(
			{ min: 1000, max: 9999 }
		)}`,
	};
};

export const generateIsbn = (faker: Faker): string => {
	const prefix = faker.number.int(1000);
	const registrant = faker.number.int(1000);
	const publication = faker.number.int(1000);
	const control = faker.number.int(10);

	return `${prefix}-${registrant}-${publication}-${control}`;
};

export const generateBook = (faker: Faker): Book => {
	return {
		id_document: faker.number.int(10000),
		genre: faker.lorem.sentence(10),
		issn: `${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int(
			{ min: 1000, max: 9999 }
		)}`,
		isbn: generateIsbn(faker),
		dewey: faker.number.int(10000),
	};
};
