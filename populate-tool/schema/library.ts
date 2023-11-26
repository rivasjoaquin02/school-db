import { Faker } from "@faker-js/faker";
import { pgTable, text, varchar, serial } from "drizzle-orm/pg-core";

export const library = pgTable("library", {
	id_library: serial("id_library").primaryKey(),
	name_library: varchar("name_library", { length: 255 }).unique().notNull(),
	location_library: varchar("location_library", { length: 255 }).notNull(),
	description_library: text("description_library"),
	website: varchar("website", { length: 255 }),
});
export type Library = typeof library.$inferInsert;

export const generateLibrary = async (faker: Faker): Promise<Library> => {
	return {
		name_library: faker.helpers.fake(`Biblioteca {{person.fullName()}}`),
		location_library: faker.location.streetAddress(true),
		description_library: faker.lorem.paragraph(),
		website: faker.internet.url(),
	};
};
