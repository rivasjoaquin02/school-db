import { pgTable, integer, text, varchar } from "drizzle-orm/pg-core";
import { access_method_type, pickRandom } from "./enums";
import { library } from "./library";
import { Faker } from "@faker-js/faker";

export const room = pgTable("room", {
	id_room: varchar("id_room", { length: 20 }).primaryKey(), //CAR 2018-0070-C
	id_library: integer("id_library").references(() => library.id_library),
	name_room: varchar("name_room", { length: 255 }).unique().notNull(),
	location_room: varchar("location_room", { length: 255 }).notNull(),
	description_room: text("description_room"),
	access_method: access_method_type("access_method"),
	phone_extension: integer("phone_extension"),
});
export type Room = typeof room.$inferInsert;

export const generateIdRoom = async (faker: Faker): Promise<string> => {
	// random 3 uppercase letters -> ABC
	const randomId = faker.string.alpha({ length: 3, casing: "upper" });

	// random year -> 2018
	const randomYear = faker.date
		.between({ from: 2000, to: 2022 })
		.getFullYear();

	// random 4 digits -> 0070
	const randomDigits = faker.number.int({ min: 1111, max: 9999 });

	// random 1 letter -> C
	const randomLetter = faker.string.alpha({ length: 1, casing: "upper" });

	return `${randomId} ${randomYear}-${randomDigits}-${randomLetter}`;
};

export const generateRoom = async (faker: Faker): Promise<Room> => {
	return {
		id_room: await generateIdRoom(faker), //CAR 2018-0070-C
		id_library: faker.number.int({ min: 1, max: 1000000 }),
		name_room: faker.helpers.fake(`Sala {{company.name()}}`),
		location_room: faker.location.streetAddress(true),
		description_room: faker.lorem.paragraph(),
		access_method: pickRandom(access_method_type.enumValues),
		phone_extension: faker.number.int({ min: 100, max: 999 }),
	};
};
