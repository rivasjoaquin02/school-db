import { collection } from "../collection/collection.ts";
import { db } from "../../db.ts";
import { document } from "./document.ts";
import { sql } from "drizzle-orm";

export const getIdCollection = db
	.select({ id_collection: collection.id_collection })
	.from(collection)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_collection");

export const getIdDocument = db
	.select({ id_document: document.id_document })
	.from(document)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_document");

export const getTotalDocuments = db
	.select({ count: sql`COUNT(*)` })
	.from(document)
	.prepare("total_document");
