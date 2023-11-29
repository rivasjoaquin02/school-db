import { sql } from "drizzle-orm";
import { phone } from ".";
import { db } from "../../db";

export const getPhoneNumbers = db
	.select({ phone_number: phone.phone_number })
	.from(phone)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("phone_number");

export const getTotalPhone = db
	.select({ count: sql`COUNT(*)` })
	.from(phone)
	.prepare("total_phone");
