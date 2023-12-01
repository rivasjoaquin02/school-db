import { sql } from "drizzle-orm";
import { db } from "../db";
import { author } from "../schema/author";
import { collection } from "../schema/collection";
import { document } from "../schema/document";
import { email } from "../schema/email";
import { library } from "../schema/library";
import { member, researcher, professional } from "../schema/member";
import { phone } from "../schema/phone";
import { room } from "../schema/room";
import { service, loan } from "../schema/service";

export const getIdsAuthor = db
	.select({ id_author: author.id_author })
	.from(author)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_author");

export const getTotalAuthors = db
	.select({ count: sql`COUNT(*)` })
	.from(author)
	.prepare("total_authors");

export const getTotalCollections = db
	.select({ count: sql`COUNT(*)` })
	.from(collection)
	.prepare("total_collections");

export const getIdsCollection = db
	.select({ id_collection: collection.id_collection })
	.from(collection)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_collection");

export const getTotalDocuments = db
	.select({ count: sql`COUNT(*)` })
	.from(document)
	.prepare("total_document");

export const getIdsDocument = db
	.select({ id_document: document.id_document })
	.from(document)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_document");

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

export const getTotalLibrary = db
	.select({ count: sql`COUNT(*)` })
	.from(library)
	.prepare("total_library");

export const getIdsLibrary = db
	.select({ id_library: library.id_library })
	.from(library)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_library");

export const getTotalMember = db
	.select({ count: sql`COUNT(*)` })
	.from(member)
	.prepare("total_member");

export const getIdsMember = db
	.select({ id_member: member.id_member })
	.from(member)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_member");

export const getTotalResearcher = db
	.select({ count: sql`COUNT(*)` })
	.from(researcher)
	.prepare("total_services");

export const getTotalProfessional = db
	.select({ count: sql`COUNT(*)` })
	.from(professional)
	.prepare("total_services");

export const getTotalPhone = db
	.select({ count: sql`COUNT(*)` })
	.from(phone)
	.prepare("total_phone");

export const getPhoneNumbers = db
	.select({ phone_number: phone.phone_number })
	.from(phone)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("phone_number");

export const getTotalRoom = db
	.select({ count: sql`COUNT(*)` })
	.from(room)
	.prepare("total_rooms");

export const getIdsRoom = db
	.select({ id_room: room.id_room })
	.from(room)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_room");

export const getTotalServices = db
	.select({ count: sql`COUNT(*)` })
	.from(service)
	.prepare("total_services");

export const getTotalLoan = db
	.select({ count: sql`COUNT(*)` })
	.from(loan)
	.prepare("total_loan");

export const getIdsResearcher = db
	.select({ id_member: researcher.id_member })
	.from(researcher)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_member");

export const getIdsService = db
	.select({ id_service: service.id_service })
	.from(service)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_service");

export const getIdsLoan = db
	.select({ id_service: loan.id_service, id_document: loan.id_document })
	.from(loan)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_loan");

export const getIdsProfessional = db
	.select({ id_member: professional.id_member })
	.from(professional)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_member");
