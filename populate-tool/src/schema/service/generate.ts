import { Faker } from "@faker-js/faker";
import { pickRandom } from "../../utils/pick-random";
import { DocumentSelect } from "../document";
import { getRandomIdLibrary } from "../library";
import {
	ProfessionalSelect,
	ResearcherSelect,
	getTotalProfessional,
	getTotalResearcher,
} from "../member";
import {
	FineInsert,
	LoanInsert,
	LoanLibraryInsert,
	LoanProfessionalInsert,
	LoanResearcherInsert,
	ServiceInsert,
	ServiceMemberInsert,
	ServiceRoomInsert,
	ServiceSelect,
	getTotalServices,
	getIdsLoan,
	getTotalLoan,
	getIdsResearcher,
	getIdsProfessional,
	getIdsService,
} from ".";
import { service_type, status_type, loan_type, penalty_type } from "./schema";
import { getRandomIdRoom } from "../room/generate";
import { getRandomIdMember } from "../member/generate";
import { getRandomIdDocument } from "../document/generate";

export const getRandomIdService = async (
	faker: Faker
): Promise<ServiceSelect["id_service"]> => {
	const [{ count }] = await getTotalServices.execute();

	const idsService = await getIdsService.execute({
		limit: 100,
		offset: faker.number.int(Number(count)),
	});

	const { id_service } = pickRandom(idsService);

	return id_service;
};
export const getRandomIdLoan = async (
	faker: Faker
): Promise<{
	id_service: ServiceSelect["id_service"];
	id_document: DocumentSelect["id_document"];
}> => {
	const [{ count }] = await getTotalLoan.execute();

	const idsLoan = await getIdsLoan.execute({
		limit: 10,
		offset: Math.abs(faker.number.int(Number(count)) - 10),
	});

	const { id_service, id_document } = pickRandom(idsLoan);

	return { id_service, id_document };
};
export const getRandomIdResearcher = async (
	faker: Faker
): Promise<ResearcherSelect["id_member"]> => {
	const [{ count }] = await getTotalResearcher.execute();

	const idsResearcher = await getIdsResearcher.execute({
		limit: 100,
		offset: faker.number.int(Number(count)),
	});

	const { id_member } = pickRandom(idsResearcher);

	return id_member;
};
export const getRandomIdProfessional = async (
	faker: Faker
): Promise<ProfessionalSelect["id_member"]> => {
	const [{ count }] = await getTotalProfessional.execute();

	const idsMember = await getIdsProfessional.execute({
		limit: 100,
		offset: faker.number.int(Number(count)),
	});

	const { id_member } = pickRandom(idsMember);

	return id_member;
};

export const generateService = async (
	faker: Faker
): Promise<ServiceInsert> => ({
	description_service: faker.lorem.paragraph(),
	type_service: pickRandom(service_type.enumValues),
});

export const generateServiceRoom = async (
	faker: Faker
): Promise<ServiceRoomInsert> => ({
	id_service: await getRandomIdService(faker),
	id_room: await getRandomIdRoom(faker),
});

export const generateServiceMember = async (
	faker: Faker
): Promise<ServiceMemberInsert> => ({
	id_service: await getRandomIdService(faker),
	id_member: await getRandomIdMember(faker),
});

export const generateLoan = async (faker: Faker): Promise<LoanInsert> => ({
	id_service: await getRandomIdService(faker),
	id_document: await getRandomIdDocument(faker),
	term: faker.number.int(30),
	start_date: faker.date.past().toString(),
	end_date: faker.date.future().toString(),
	status: pickRandom(status_type.enumValues),
	type_loan: pickRandom(loan_type.enumValues),
});

export const generateLoanResearcher = async (
	faker: Faker
): Promise<LoanResearcherInsert> => {
	const { id_service, id_document } = await getRandomIdLoan(faker);

	return {
		id_service,
		id_document,
		id_member: await getRandomIdResearcher(faker),
	};
};

export const generateLoanProfessional = async (
	faker: Faker
): Promise<LoanProfessionalInsert> => {
	const { id_service, id_document } = await getRandomIdLoan(faker);

	return {
		id_service,
		id_document,
		id_member: await getRandomIdProfessional(faker),
	};
};

export const generateLoanLibrary = async (
	faker: Faker
): Promise<LoanLibraryInsert> => {
	const { id_service, id_document } = await getRandomIdLoan(faker);

	return {
		id_service,
		id_document,
		id_library: await getRandomIdLibrary(faker),
		id_library2: await getRandomIdLibrary(faker),
	};
};

export const generateFine = async (faker: Faker): Promise<FineInsert> => {
	const { id_service, id_document } = await getRandomIdLoan(faker);

	return {
		id_service,
		id_document,
		penalty: pickRandom(penalty_type.enumValues),
		fee: faker.number.float(1000),
	};
};
