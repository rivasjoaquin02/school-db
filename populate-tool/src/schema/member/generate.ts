import { Faker } from "@faker-js/faker";
import { pickRandom } from "../../utils/pick-random";
import { getIdsMember, getTotalMember } from "./querys";
import { category_type } from "./schema";
import {
	MemberInsert,
	ResearcherInsert,
	ProfessionalInsert,
	StudentInsert,
	MemberSelect,
} from "./types";

export const getRandomIdMember = async (
	faker: Faker
): Promise<MemberSelect["id_member"]> => {
	const [{ count }] = await getTotalMember.execute();

	const idsMember = await getIdsMember.execute({
		limit: 100,
		offset: faker.number.int(Number(count)),
	});

	const { id_member } = pickRandom(idsMember);

	return id_member;
};

export const generateMember = async (faker: Faker): Promise<MemberInsert> => ({
	name: faker.person.fullName(),
	age: faker.number.int({ min: 18, max: 100 }),
	country: pickRandom(["Cuba", faker.location.country()]),
	category: pickRandom(category_type.enumValues),
});

export const generateResearcher = async (
	faker: Faker
): Promise<ResearcherInsert> => ({
	id_member: await getRandomIdMember(faker),
});

export const generateProfessional = async (
	faker: Faker
): Promise<ProfessionalInsert> => ({
	id_member: await getRandomIdMember(faker),
	organization: faker.company.name(),
});

export const generateStudent = async (
	faker: Faker
): Promise<StudentInsert> => ({
	id_member: await getRandomIdMember(faker),
	school: `${pickRandom([
		"Preuniversitario",
		"HighSchool",
		"Universidad",
		"University",
		"Escuela Catolica",
		"Catolic School",
	])} ${faker.company.name()}`,
});
