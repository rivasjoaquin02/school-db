import { Faker } from "@faker-js/faker";
import {
	Service,
	service_type,
	ServiceRoom,
	getIdService,
	ServiceMember,
	Loan,
	status_type,
	loan_type,
	LoanResearcher,
	getIdLoan,
	getIdResearcher,
	LoanProfessional,
	getIdProfessional,
	LoanLibrary,
	Fine,
	penalty_type,
} from ".";
import { pickRandom } from "../../utils/pick-random";
import { getIdRoom } from "../collection";
import { getIdDocument } from "../document";
import { getIdLibrary } from "../library";
import { getIdMember } from "../member";

export const generateService = async (faker: Faker): Promise<Service> => {
	return {
		description_service: faker.lorem.paragraph(),
		type_service: pickRandom(service_type.enumValues),
	};
};

export const generateServiceRoom = async (): Promise<ServiceRoom> => {
	const { id_service } = pickRandom(await getIdService.execute());
	const { id_room } = pickRandom(await getIdRoom.execute());

	return {
		id_service,
		id_room,
	};
};

export const generateServiceMember = async (): Promise<ServiceMember> => {
	const { id_service } = pickRandom(await getIdService.execute());
	const { id_member } = pickRandom(await getIdMember.execute());

	return {
		id_service,
		id_member,
	};
};

export const generateLoan = async (faker: Faker): Promise<Loan> => {
	const { id_service } = pickRandom(await getIdService.execute());
	const { id_document } = pickRandom(await getIdDocument.execute());

	return {
		id_service,
		id_document,
		term: faker.number.int(30),
		start_date: faker.date.past().toString(),
		end_date: faker.date.future().toString(),
		status: pickRandom(status_type.enumValues),
		type_loan: pickRandom(loan_type.enumValues),
	};
};

export const generateLoanResearcher = async (): Promise<LoanResearcher> => {
	const { id_service, id_document } = pickRandom(await getIdLoan.execute());
	const { id_member } = pickRandom(await getIdResearcher.execute());

	return {
		id_service,
		id_document,
		id_member,
	};
};

export const generateLoanProfessional = async (): Promise<LoanProfessional> => {
	const { id_service, id_document } = pickRandom(await getIdLoan.execute());
	const { id_member } = pickRandom(await getIdProfessional.execute());

	return {
		id_service,
		id_document,
		id_member,
	};
};

export const generateLoanLibrary = async (): Promise<LoanLibrary> => {
	const { id_service, id_document } = pickRandom(await getIdLoan.execute());
	const { id_library } = pickRandom(await getIdLibrary.execute());
	const { id_library: id_library2 } = pickRandom(
		await getIdLibrary.execute()
	);

	return {
		id_service,
		id_document,
		id_library,
		id_library2,
	};
};

export const generateFine = async (faker: Faker): Promise<Fine> => {
	const { id_service, id_document } = pickRandom(await getIdLoan.execute());

	return {
		id_service,
		id_document,
		penalty: pickRandom(penalty_type.enumValues),
		fee: faker.number.float(1000),
	};
};
