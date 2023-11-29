import { sql } from "drizzle-orm";
import { member } from ".";
import { db } from "../../db";

export const getIdsMember = db
	.select({ id_member: member.id_member })
	.from(member)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_member");

export const getTotalMember = db
	.select({ count: sql`COUNT(*)` })
	.from(member)
	.prepare("total_member");

