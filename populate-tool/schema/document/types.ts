import {
	book,
	document,
	document_collection,
	magazine,
	manuscript,
	map,
	media,
	music,
	paint,
	picture,
	reference,
} from "./document";

export type Document = typeof document.$inferInsert;
export type DocumentCollection = typeof document_collection.$inferInsert;
export type Manuscript = typeof manuscript.$inferInsert;
export type Map = typeof map.$inferInsert;
export type Picture = typeof picture.$inferInsert;
export type Paint = typeof paint.$inferInsert;
export type Media = typeof media.$inferInsert;
export type Music = typeof music.$inferInsert;
export type Reference = typeof reference.$inferInsert;
export type Magazine = typeof magazine.$inferInsert;
export type Book = typeof book.$inferInsert;
