import { email, email_collection, email_library, email_room } from "./email";

export type Email = typeof email.$inferInsert;
export type EmailLibrary = typeof email_library.$inferInsert;
export type EmailRoom = typeof email_room.$inferInsert;
export type EmailCollection = typeof email_collection.$inferInsert;
