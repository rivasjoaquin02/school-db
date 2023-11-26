import { email, email_library, email_room, email_collection } from ".";


export type Email = typeof email.$inferInsert;
export type EmailLibrary = typeof email_library.$inferInsert;
export type EmailRoom = typeof email_room.$inferInsert;
export type EmailCollection = typeof email_collection.$inferInsert;
