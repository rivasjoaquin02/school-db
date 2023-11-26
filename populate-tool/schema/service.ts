import {
	pgTable,
	integer,
	text,
	varchar,
	serial,
	date,
} from "drizzle-orm/pg-core";
import {
	loan_type,
	penalty_type,
	pickRandom,
	service_type,
	status_type,
} from "./enums";
import { generateIdRoom, room } from "./room";
import { member, professional, researcher } from "./member";
import { document } from "./document";
import { library } from "./library";
import { Faker, faker } from "@faker-js/faker";

export const service = pgTable("service", {
	id_service: serial("id_service").notNull().primaryKey(),
	description_service: text("description_service"),
	type_service: service_type("type_service").notNull(),
});

export type Service = typeof service.$inferInsert;

export const service_room = pgTable("service_room", {
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_room: varchar("id_room", { length: 20 })
		.notNull()
		.primaryKey()
		.references(() => room.id_room),
});

export type ServiceRoom = typeof service_room.$inferInsert;

export const service_member = pgTable("service_member", {
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_member: integer("id_member")
		.notNull()
		.primaryKey()
		.references(() => member.id_member),
});

export type ServiceMember = typeof service_member.$inferInsert;

export const loan = pgTable("loan", {
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	term: integer("term"),
	start_date: date("start_date").notNull(),
	end_date: date("end_date").notNull(),
	status: status_type("status").notNull(),
	type_loan: loan_type("type_loan").notNull(),
});

export type Loan = typeof loan.$inferInsert;

export const loan_researcher = pgTable("loan_researcher", {
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	id_member: integer("id_member")
		.notNull()
		.primaryKey()
		.references(() => researcher.id_member),
});

export type LoanResearcher = typeof loan_researcher.$inferInsert;

export const loan_professional = pgTable("loan_professional", {
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	id_member: integer("id_member")
		.notNull()
		.primaryKey()
		.references(() => professional.id_member),
});

export type LoanProfessional = typeof loan_professional.$inferInsert;

export const loan_library = pgTable("loan_library", {
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	id_library: integer("id_library")
		.notNull()
		.primaryKey()
		.references(() => library.id_library),
	id_library2: integer("id_library")
		.notNull()
		.primaryKey()
		.references(() => library.id_library),
});

export type LoanLibrary = typeof loan_library.$inferInsert;

export const fine = pgTable("fine", {
	id_fine: serial("id_fine").notNull().primaryKey(),
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	penalty: penalty_type("penalty").notNull(),
	fee: integer("fee"),
});

export type Fine = typeof fine.$inferInsert;

export const generateService = async (faker: Faker): Promise<Service> => {
	return {
		id_service: faker.number.int(1000),
		description_service: faker.lorem.paragraph(),
		type_service: pickRandom(service_type.enumValues),
	};
};

export const generateServiceRoom = async (
	faker: Faker
): Promise<ServiceRoom> => {
	return {
		id_service: faker.number.int(1000),
		id_room: await generateIdRoom(faker),
	};
};

export const generateServiceMember = async (
	faker: Faker
): Promise<ServiceMember> => {
	return {
		id_service: faker.number.int(1000),
		id_member: faker.number.int(1000),
	};
};

export const generateLoan = async (faker: Faker): Promise<Loan> => {
	return {
		id_service: faker.number.int(1000),
		id_document: faker.number.int(1000),
		term: faker.number.int(30),
		start_date: faker.date.past().toString(),
		end_date: faker.date.future().toString(),
		status: pickRandom(status_type.enumValues),
		type_loan: pickRandom(loan_type.enumValues),
	};
};

export const generateLoanResearcher = async (
	faker: Faker
): Promise<LoanResearcher> => {
	return {
		id_service: faker.number.int(1000),
		id_document: faker.number.int(1000),
		id_member: faker.number.int(1000),
	};
};

export const generateLoanProfessional = async (
	faker: Faker
): Promise<LoanProfessional> => {
	return {
		id_service: faker.number.int(1000),
		id_document: faker.number.int(1000),
		id_member: faker.number.int(1000),
	};
};

export const generateLoanLibrary = async (
	faker: Faker
): Promise<LoanLibrary> => {
	return {
		id_service: faker.number.int(1000),
		id_document: faker.number.int(1000),
		id_library: faker.number.int(1000),
		id_library2: faker.number.int(1000),
	};
};

export const generateFine = async (faker: Faker): Promise<Fine> => {
	return {
		id_fine: faker.number.int(1000),
		id_service: faker.number.int(1000),
		id_document: faker.number.int(1000),
		penalty: pickRandom(penalty_type.enumValues),
		fee: faker.number.float(1000),
	};
};
