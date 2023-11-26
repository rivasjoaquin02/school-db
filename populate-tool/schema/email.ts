import { pgTable, integer, text, varchar } from "drizzle-orm/pg-core";
import { library } from "./library";
import { generateIdRoom, room } from "./room";
import { collection } from "./collection";
import { Faker, faker } from "@faker-js/faker";

// EMAIL

export const email = pgTable("email", {
	email: varchar("email", { length: 20 }).notNull().primaryKey(), //'%_@__%.__%'
	description_email: text("description_email"),
});
export type Email = typeof email.$inferInsert;

export const email_library = pgTable("email_library", {
	email: varchar("email", { length: 20 }).notNull().primaryKey(), //'%_@__%.__%'
	id_library: integer("id_library")
		.notNull()
		.references(() => library.id_library),
});

export type EmailLibrary = typeof email_library.$inferInsert;

export const email_room = pgTable("email_room", {
	email: varchar("email", { length: 20 }).notNull().primaryKey(), //'%_@__%.__%'
	id_room: varchar("id_room", { length: 20 })
		.notNull()
		.references(() => room.id_room),
});

export type EmailRoom = typeof email_room.$inferInsert;

export const email_collection = pgTable("email_collection", {
	email: varchar("email", { length: 20 }).notNull().primaryKey(), //'%_@__%.__%'
	id_collection: varchar("id_collection", { length: 10 })
		.notNull()
		.references(() => collection.id_collection),
});

export type EmailCollection = typeof email_collection.$inferInsert;

export const generateEmail = async (faker: Faker): Promise<Email> => {
	return {
		email: faker.internet
			.email({ allowSpecialCharacters: false })
			.toLocaleLowerCase(),
		description_email: faker.lorem.sentence(5),
	};
};

export const generateEmailLibrary = async (
	faker: Faker
): Promise<EmailLibrary> => {
	return {
		email: faker.internet
			.email({ allowSpecialCharacters: false })
			.toLocaleLowerCase(),
		id_library: faker.number.int(10000),
	};
};

// TODO: fix ids
export const generateEmailRoom = async (faker: Faker): Promise<EmailRoom> => {
	return {
		email: faker.internet
			.email({ allowSpecialCharacters: false })
			.toLocaleLowerCase(),
		id_room: await generateIdRoom(faker),
	};
};
