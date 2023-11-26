import { pgTable, integer, varchar, serial } from "drizzle-orm/pg-core";
import { category_type, pickRandom } from "./enums";
import { Faker } from "@faker-js/faker";

export const member = pgTable("member", {
	id_member: serial("id_member").notNull().primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	age: integer("age"),
	country: varchar("country", { length: 100 }).notNull(),
	category: category_type("category"),
});

export type Member = typeof member.$inferInsert;

export const researcher = pgTable("researcher", {
	id_member: integer("id_member")
		.notNull()
		.references(() => member.id_member),
});

export type Researcher = typeof researcher.$inferInsert;

export const professional = pgTable("professional", {
	id_member: integer("id_member")
		.notNull()
		.references(() => member.id_member),
	organization: varchar("organization", { length: 100 }),
});

export type Professional = typeof professional.$inferInsert;

export const student = pgTable("student", {
	id_member: integer("id_member")
		.notNull()
		.references(() => member.id_member),
	school: varchar("school", { length: 100 }),
});

export type Student = typeof student.$inferInsert;

export const generateMember = async (faker: Faker): Promise<Member> => {
	return {
		id_member: faker.number.int(10000),
		name: faker.person.fullName(),
		age: faker.number.int({ min: 18, max: 100 }),
		country: pickRandom(["Cuba", faker.location.country()]),
		category: pickRandom(category_type.enumValues),
	};
};

export const generateResearcher = async (faker: Faker): Promise<Researcher> => {
	return {
		id_member: faker.number.int(10000),
	};
};

export const generateProfessional = async (
	faker: Faker
): Promise<Professional> => {
	return {
		id_member: faker.number.int(10000),
		organization: faker.company.name(),
	};
};

export const generateStudent = async (faker: Faker): Promise<Student> => {
	return {
		id_member: faker.number.int(10000),
		school: faker.company.name(),
	};
};
