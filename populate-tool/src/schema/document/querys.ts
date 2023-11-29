import { db } from "../../db.ts";
import { document } from "./schema.ts";
import { sql } from "drizzle-orm";

export const getIdsDocument = db
	.select({ id_document: document.id_document })
	.from(document)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_document");

export const getTotalDocuments = db
	.select({ count: sql`COUNT(*)` })
	.from(document)
	.prepare("total_document");
