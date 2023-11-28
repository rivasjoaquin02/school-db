import { sql } from "drizzle-orm";
import { service, loan } from ".";
import { db } from "../../db";
import { professional, researcher } from "../member";

export const getIdResearcher = db
	.select({ id_member: researcher.id_member })
	.from(researcher)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_member");

export const getIdService = db
	.select({ id_service: service.id_service })
	.from(service)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_service");

export const getIdLoan = db
	.select({ id_service: loan.id_service, id_document: loan.id_document })
	.from(loan)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_loan");

export const getIdProfessional = db
	.select({ id_member: professional.id_member })
	.from(professional)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_member");
