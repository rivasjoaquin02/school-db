import { Faker } from "@faker-js/faker";
import { pgTable, integer, text, varchar } from "drizzle-orm/pg-core";
import { library } from "./library";
import { generateIdRoom, room } from "./room";

export const phone = pgTable("phone", {
	id_phone: integer("id_phone").notNull().primaryKey(),
	phone_number: varchar("phone_number", { length: 20 }).unique().notNull(), //'(___) ___-____'
	description_phone: text("description_phone"),
});
export type Phone = typeof phone.$inferInsert;

export const phone_library = pgTable("phone_library ", {
	id_phone: integer("id_phone").notNull().primaryKey(),
	id_library: integer("id_library")
		.notNull()
		.references(() => library.id_library),
});
export type PhoneLibrary = typeof phone_library.$inferInsert;

export const phone_room = pgTable("phone_room", {
	id_phone: integer("id_phone").notNull().primaryKey(),
	id_room: varchar("id_room", { length: 20 })
		.notNull()
		.references(() => room.id_room),
});
export type PhoneRoom = typeof phone_room.$inferInsert;

const generatePhoneNumber = async (faker: Faker): Promise<string> => {
	const phone_number = `(${faker.number.int(999)}) ${faker.number.int({
		min: 1111,
		max: 9999,
	})}-${faker.number.int({ min: 111, max: 999 })}`;
	return phone_number;
};

export const generatePhone = async (faker: Faker): Promise<Phone> => {
	return {
		id_phone: faker.number.int(10000),
		phone_number: await generatePhoneNumber(faker),
		description_phone: faker.lorem.sentence(5),
	};
};

export const generatePhoneLibrary = async (
	faker: Faker
): Promise<PhoneLibrary> => {
	return {
		id_phone: faker.number.int(10000),
		id_library: faker.number.int(10000),
	};
};

export const generatePhoneRoom = async (faker: Faker): Promise<PhoneRoom> => {
	return {
		id_phone: faker.number.int(10000),
		id_room: await generateIdRoom(faker),
	};
};
