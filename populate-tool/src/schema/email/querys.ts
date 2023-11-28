import { sql } from "drizzle-orm";
import { email } from ".";
import { db } from "../../db";

export const getEmail = db
	.select({ email: email.email })
	.from(email)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("email");
