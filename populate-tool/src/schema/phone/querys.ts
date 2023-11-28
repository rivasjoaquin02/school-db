import { sql } from "drizzle-orm";
import { phone } from ".";
import { db } from "../../db";

export const getPhoneNumber = db
	.select({ phone_number: phone.phone_number })
	.from(phone)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("phone_number");
