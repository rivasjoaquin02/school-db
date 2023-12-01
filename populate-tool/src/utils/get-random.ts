import { AuthorSelect } from "../schema/author";
import { CollectionSelect } from "../schema/collection";
import { DocumentSelect } from "../schema/document";
import { EmailSelect } from "../schema/email";
import { LibrarySelect } from "../schema/library";
import {
	MemberSelect,
	ResearcherSelect,
	ProfessionalSelect,
} from "../schema/member";
import { PhoneSelect } from "../schema/phone";
import { RoomSelect } from "../schema/room";
import { ServiceSelect } from "../schema/service";
import {
	getTotalAuthors,
	getIdsAuthor,
	getTotalCollections,
	getIdsCollection,
	getTotalDocuments,
	getIdsDocument,
	getTotalEmails,
	getEmails,
	getTotalLibrary,
	getIdsLibrary,
	getTotalMember,
	getIdsMember,
	getTotalPhone,
	getPhoneNumbers,
	getTotalRoom,
	getIdsRoom,
	getTotalServices,
	getIdsService,
	getTotalLoan,
	getIdsLoan,
	getTotalResearcher,
	getIdsResearcher,
	getTotalProfessional,
	getIdsProfessional,
} from "./get-ids";
import { pickRandom } from "./pick-random";

export const getRandomIdAuthor = async (): Promise<
	AuthorSelect["id_author"]
> => {
	const [{ count }] = await getTotalAuthors.execute();

	const idsAuthor = await getIdsAuthor.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});

	const { id_author } = pickRandom(idsAuthor);

	return id_author;
};

export const getRandomIdCollection = async (): Promise<
	CollectionSelect["id_collection"]
> => {
	const [{ count }] = await getTotalCollections.execute();

	const idsCollection = await getIdsCollection.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});

	const { id_collection } = pickRandom(idsCollection);

	return id_collection;
};

export const getRandomIdDocument = async (): Promise<
	DocumentSelect["id_document"]
> => {
	const [{ count }] = await getTotalDocuments.execute();

	const idsDocument = await getIdsDocument.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});

	const { id_document } = pickRandom(idsDocument);

	return id_document;
};

export const getRandomEmail = async (): Promise<EmailSelect["email"]> => {
	const [{ count }] = await getTotalEmails.execute();

	const emails = await getEmails.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});

	const { email } = pickRandom(emails);

	return email;
};

export const getRandomIdLibrary = async (): Promise<
	LibrarySelect["id_library"]
> => {
	const [{ count }] = await getTotalLibrary.execute();

	const idsLibrary = await getIdsLibrary.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});

	const { id_library } = pickRandom(idsLibrary);

	return id_library;
};

export const getRandomIdMember = async (): Promise<
	MemberSelect["id_member"]
> => {
	const [{ count }] = await getTotalMember.execute();

	const idsMember = await getIdsMember.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});

	const { id_member } = pickRandom(idsMember);

	return id_member;
};

export const getRandomPhoneNumber = async (): Promise<
	PhoneSelect["phone_number"]
> => {
	const [{ count }] = await getTotalPhone.execute();

	const phoneNumbers = await getPhoneNumbers.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});

	const { phone_number } = pickRandom(phoneNumbers);

	return phone_number;
};

export const getRandomIdRoom = async (): Promise<RoomSelect["id_room"]> => {
	const [{ count }] = await getTotalRoom.execute();

	const idsRoom = await getIdsRoom.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});

	const { id_room } = pickRandom(idsRoom);

	return id_room;
};

export const getRandomIdService = async (): Promise<
	ServiceSelect["id_service"]
> => {
	const [{ count }] = await getTotalServices.execute();

	const idsService = await getIdsService.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});

	const { id_service } = pickRandom(idsService);

	return id_service;
};
export const getRandomIdLoan = async (): Promise<{
	id_service: ServiceSelect["id_service"];
	id_document: DocumentSelect["id_document"];
}> => {
	const [{ count }] = await getTotalLoan.execute();

	const idsLoan = await getIdsLoan.execute({
		limit: 10,
		offset: Math.abs(Math.floor(Math.random() * Number(count)) - 10),
	});

	const { id_service, id_document } = pickRandom(idsLoan);

	return { id_service, id_document };
};
export const getRandomIdResearcher = async (): Promise<
	ResearcherSelect["id_member"]
> => {
	const [{ count }] = await getTotalResearcher.execute();

	const idsResearcher = await getIdsResearcher.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});

	const { id_member } = pickRandom(idsResearcher);

	return id_member;
};
export const getRandomIdProfessional = async (): Promise<
	ProfessionalSelect["id_member"]
> => {
	const [{ count }] = await getTotalProfessional.execute();

	const idsMember = await getIdsProfessional.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});

	const { id_member } = pickRandom(idsMember);

	return id_member;
};
