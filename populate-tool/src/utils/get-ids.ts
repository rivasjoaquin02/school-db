import { sql } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { db } from "../db/db";
import { author } from "../schema/author";
import { collection } from "../schema/collection";
import { email } from "../schema/email";
import { library } from "../schema/library";
import { member, researcher, professional } from "../schema/member";
import { phone } from "../schema/phone";
import { room } from "../schema/room";
import { service, loan } from "../schema/service";
import { document } from "../schema/document";

const getIds = (table: PgTable, idField: string) => {
	if (table[idField])
		return db
			.select({ id: table[idField] })
			.from(table)
			.limit(sql.placeholder("limit"))
			.offset(sql.placeholder("offset"))
			.prepare(idField);
};

const getTotal = (table: PgTable) =>
	db
		.select({ count: sql`COUNT(*)` })
		.from(table)
		.prepare("total_" + table);

export const getTotalAuthors = getTotal(author);
export const getIdsAuthor = getIds(author, "id_author");

export const getTotalCollections = getTotal(collection);
export const getIdsCollection = getIds(collection, "id_collection");

export const getTotalDocuments = getTotal(document);
export const getIdsDocument = getIds(document, "id_document");

export const getTotalEmails = getTotal(email);
export const getEmails = getIds(email, "email");

export const getTotalLibrary = getTotal(library);
export const getIdsLibrary = getIds(library, "id_library");

export const getTotalMember = getTotal(member);
export const getIdsMember = getIds(member, "id_member");

export const getTotalResearcher = getTotal(researcher);
export const getTotalProfessional = getTotal(professional);
export const getIdsResearcher = getIds(researcher, "id_member");
export const getIdsProfessional = getIds(professional, "id_member");

export const getTotalPhone = getTotal(phone);
export const getPhoneNumbers = getIds(phone, "phone");

export const getTotalRoom = getTotal(room);
export const getIdsRoom = getIds(room, "id_room");

export const getTotalServices = getTotal(service);
export const getIdsService = getIds(service, "id_service");

export const getTotalLoan = getTotal(loan);
export const getIdsLoan = getIds(loan, "");
