import { sql } from "drizzle-orm";
import { db } from "../../db.ts";
import { author } from "./schema.ts";

export const getIdAuthor = db
	.select({ id_author: author.id_author })
	.from(author)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_author");

export const getTotalAuthors = db
	.select({ count: sql`COUNT(*)` })
	.from(author)
	.prepare("total_authors");
