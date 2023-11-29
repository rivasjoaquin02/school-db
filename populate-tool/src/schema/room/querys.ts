import { sql } from "drizzle-orm";
import { db } from "../../db";
import { room } from ".";

export const getIdsRoom = db
	.select({ id_room: room.id_room })
	.from(room)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_room");

export const getTotalRoom = db
	.select({ count: sql`COUNT(*)` })
	.from(room)
	.prepare("total_rooms");
