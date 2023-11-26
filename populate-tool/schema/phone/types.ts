import { phone, phone_library, phone_room } from ".";

export type Phone = typeof phone.$inferInsert;
export type PhoneLibrary = typeof phone_library.$inferInsert;
export type PhoneRoom = typeof phone_room.$inferInsert;
