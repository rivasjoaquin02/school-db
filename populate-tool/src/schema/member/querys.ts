import { sql } from "drizzle-orm";
import { member } from ".";
import { db } from "../../db";

export const getIdMember = db
	.select({ id_member: member.id_member })
	.from(member)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_member");
