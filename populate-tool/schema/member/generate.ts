import { Faker } from "@faker-js/faker";
import { Member, Professional, Researcher, Student } from "./types";
import { pickRandom } from "../../utils/pick-random";
import { category_type } from "../enums";
import { db } from "../../db";
import { member } from "./member";

export const generateMember = async (faker: Faker): Promise<Member> => {
	return {
		name: faker.person.fullName(),
		age: faker.number.int({ min: 18, max: 100 }),
		country: pickRandom(["Cuba", faker.location.country()]),
		category: pickRandom(category_type.enumValues),
	};
};

export const getIdMember = db
	.select({ id_member: member.id_member })
	.from(member)
	.prepare("id_member");

export const generateResearcher = async (): Promise<Researcher> => {
	const { id_member } = pickRandom(await getIdMember.execute());
	return { id_member };
};

export const generateProfessional = async (
	faker: Faker
): Promise<Professional> => {
	const { id_member } = pickRandom(await getIdMember.execute());
	return {
		id_member,
		organization: faker.company.name(),
	};
};

export const generateStudent = async (faker: Faker): Promise<Student> => {
	const { id_member } = pickRandom(await getIdMember.execute());
	return {
		id_member,
		school: faker.company.name(),
	};
};
