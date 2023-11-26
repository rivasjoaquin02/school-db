import { pgTable, integer, text, varchar } from "drizzle-orm/pg-core";
import { library } from "../library/library.ts";
import { room } from "../room/room.ts";

export const phone = pgTable("phone", {
	phone_number: varchar("phone_number", { length: 20 })
		.notNull()
		.primaryKey(),
	description_phone: text("description_phone"),
});

export const phone_library = pgTable("phone_library ", {
	phone_number: varchar("phone_number", { length: 20 })
		.notNull()
		.primaryKey()
		.references(() => phone.phone_number),
	id_library: integer("id_library")
		.notNull()
		.references(() => library.id_library),
});

export const phone_room = pgTable("phone_room", {
	phone_number: varchar("phone_number", { length: 20 })
		.notNull()
		.primaryKey()
		.references(() => phone.phone_number),
	id_room: varchar("id_room", { length: 20 })
		.notNull()
		.references(() => room.id_room),
});
