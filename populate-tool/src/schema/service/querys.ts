import { sql } from "drizzle-orm";
import { service, loan } from ".";
import { db } from "../../db";
import { professional, researcher } from "../member";

export const getTotalServices = db
	.select({ count: sql`COUNT(*)` })
	.from(service)
	.prepare("total_services");

export const getTotalLoan = db
	.select({ count: sql`COUNT(*)` })
	.from(service)
	.prepare("total_services");

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
