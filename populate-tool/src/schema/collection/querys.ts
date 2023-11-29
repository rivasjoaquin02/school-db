import { sql } from "drizzle-orm";
import { db } from "../../db";
import { collection } from ".";

export const getTotalCollections = db
	.select({ count: sql`COUNT(*)` })
	.from(collection)
	.prepare("total_collections");

export const getIdsCollection = db
	.select({ id_collection: collection.id_collection })
	.from(collection)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_collection");
