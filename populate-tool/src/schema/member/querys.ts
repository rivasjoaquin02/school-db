import { sql } from "drizzle-orm";
import { member, professional, researcher } from ".";
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

export const getTotalResearcher = db
	.select({ count: sql`COUNT(*)` })
	.from(researcher)
	.prepare("total_services");

export const getTotalProfessional = db
	.select({ count: sql`COUNT(*)` })
	.from(professional)
	.prepare("total_services");
