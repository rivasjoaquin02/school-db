import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { collection_type, pickRandom } from "./enums";
import { generateIdRoom, room } from "./room";
import { Faker } from "@faker-js/faker";

export const collection = pgTable("collection", {
	id_collection: varchar("id_collection", { length: 10 }).primaryKey(), //MED
	id_room: varchar("id_room", { length: 20 }).references(() => room.id_room),
	name_collection: varchar("name_collection", { length: 255 })
		.unique()
		.notNull(),
	description_collection: text("description_collection"),
	type_collection: collection_type("collection_type")
		.notNull()
		.default("general"),
});

export type Collection = typeof collection.$inferInsert;

export const generateIdCollection = (faker: Faker): string => {
	// random 3 uppercase letters -> ABC
	const randomId = faker.string.alpha({ length: 3, casing: "upper" });

	// random 4 digits -> 0070
	const randomDigits = faker.number.int({ min: 1111, max: 9999 });

	return `${randomId}-${randomDigits}`;
};

// TODO: we should'nt be generating the id_room
// TODO: maxRoomIdx should be a global variable
export const generateCollection = (
	faker: Faker,
	maxRoomIdx: number
): Collection => {
	return {
		id_collection: generateIdCollection(faker),
		id_room: generateIdRoom(faker),
		name_collection: `Colección de ${faker.company.name()}`,
		description_collection: faker.lorem.paragraph(),
		type_collection: pickRandom(collection_type.enumValues),
	};
};
