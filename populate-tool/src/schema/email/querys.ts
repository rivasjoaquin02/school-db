import { sql } from "drizzle-orm";
import { email } from ".";
import { db } from "../../db";

export const getEmails = db
	.select({ email: email.email })
	.from(email)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("email");

export const getTotalEmails = db
	.select({ count: sql`COUNT(*)` })
	.from(email)
	.prepare("total_emails");
