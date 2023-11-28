import { sql } from "drizzle-orm";
import { library } from ".";
import { db } from "../../db";

export const getIdLibrary = db
	.select({ id_library: library.id_library })
	.from(library)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_library");
