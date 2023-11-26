import { pgTable, integer, text, varchar } from "drizzle-orm/pg-core";
import { document } from "./document";
import { Faker } from "@faker-js/faker";
import { pickRandom } from "./enums";

export const author = pgTable("author", {
	id_author: integer("id_author").notNull().primaryKey(),
	name_author: varchar("name_author", { length: 100 }).notNull(),
	country_author: varchar("country_author", { length: 100 }).notNull(),
	description_author: text("description_author"),
});

export type Author = typeof author.$inferInsert;

export const author_document = pgTable("author_document", {
	id_author: integer("id_author")
		.notNull()
		.primaryKey()
		.references(() => author.id_author),
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
});

export type AuthorDocument = typeof author_document.$inferInsert;

export const generateAuthor = async (faker: Faker): Promise<Author> => {
	return {
		id_author: faker.number.int(1000),
		name_author: faker.person.fullName(),
		country_author: pickRandom(["Cuba", faker.location.country()]),
		description_author: faker.lorem.paragraph(),
	};
};

export const generateAuthorDocument = async (
	faker: Faker
): Promise<AuthorDocument> => {
	return {
		id_author: faker.number.int(1000),
		id_document: faker.number.int(1000),
	};
};
