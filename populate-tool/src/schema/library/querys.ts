import { sql } from "drizzle-orm";
import { library } from ".";
import { db } from "../../db";

export const getIdsLibrary = db
	.select({ id_library: library.id_library })
	.from(library)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_library");

export const getTotalLibrary = db
	.select({ count: sql`COUNT(*)` })
	.from(library)
	.prepare("total_library");
