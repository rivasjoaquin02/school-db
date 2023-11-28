import { sql } from "drizzle-orm";
import { db } from "../../db";
import { room } from "../room";

export const getIdRoom = db
	.select({ id_room: room.id_room })
	.from(room)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_room");