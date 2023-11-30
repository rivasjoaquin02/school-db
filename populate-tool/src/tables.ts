import { faker } from "@faker-js/faker";
import { library } from "./schema/library/schema.ts";

import {
	author,
	author_document,
	generateAuthor,
	generateAuthorDocument,
} from "./schema/author/index.ts";
import { collection, generateCollection } from "./schema/collection/index.ts";
import {
	email,
	email_collection,
	email_library,
	email_room,
	generateEmail,
	generateEmailLibrary,
	generateEmailRoom,
} from "./schema/email/index.ts";
import {
	document_collection,
	manuscript,
	map,
	picture,
	paint,
	media,
	music,
	reference,
	magazine,
	book,
	generateDocument,
	generateDocumentCollection,
	generateManuscript,
	generateMap,
	generatePicture,
	generatePaint,
	generateMedia,
	generateMusic,
	generateReference,
	generateMagazine,
	generateBook,
	document,
} from "./schema/document/index.ts";
import { generateLibrary } from "./schema/library/index.ts";
import {
	member,
	researcher,
	professional,
	student,
	generateMember,
	generateResearcher,
	generateProfessional,
	generateStudent,
} from "./schema/member/index.ts";
import {
	phone,
	phone_library,
	phone_room,
	generatePhone,
	generatePhoneLibrary,
	generatePhoneRoom,
} from "./schema/phone/index.ts";
import {
	service,
	service_room,
	service_member,
	loan,
	loan_researcher,
	loan_professional,
	loan_library,
	fine,
	generateService,
	generateServiceRoom,
	generateServiceMember,
	generateLoan,
	generateLoanResearcher,
	generateLoanProfessional,
	generateLoanLibrary,
	generateFine,
} from "./schema/service/index.ts";
import { room, generateRoom } from "./schema/room/index.ts";
import { generateEmailCollection } from "./schema/email/generate.ts";
import { PgTable } from "drizzle-orm/pg-core";

const TOTAL_AMOUNT = 2_00_000;

export type Table = {
	table: PgTable;
	generateFn: () => any;
	amount: number;
};

export const tables: Record<string, Table> = {
	library: {
		table: library,
		generateFn: () => generateLibrary(faker),
		amount: TOTAL_AMOUNT,
	},
	room: {
		table: room,
		generateFn: () => generateRoom(faker),
		amount: TOTAL_AMOUNT,
	},
	collection: {
		table: collection,
		generateFn: () => generateCollection(faker),
		amount: TOTAL_AMOUNT,
	},
	document: {
		table: document,
		generateFn: () => generateDocument(faker),
		amount: TOTAL_AMOUNT,
	},
	document_collection: {
		table: document_collection,
		generateFn: () => generateDocumentCollection(faker),
		amount: TOTAL_AMOUNT / 10,
	},
	manuscript: {
		table: manuscript,
		generateFn: () => generateManuscript(faker),
		amount: TOTAL_AMOUNT / 10,
	},
	map: {
		table: map,
		generateFn: () => generateMap(faker),
		amount: TOTAL_AMOUNT / 10,
	},
	picture: {
		table: picture,
		generateFn: () => generatePicture(faker),
		amount: TOTAL_AMOUNT / 10,
	},
	paint: {
		table: paint,
		generateFn: () => generatePaint(faker),
		amount: TOTAL_AMOUNT / 10,
	},
	media: {
		table: media,
		generateFn: () => generateMedia(faker),
		amount: TOTAL_AMOUNT / 10,
	},
	music: {
		table: music,
		generateFn: () => generateMusic(faker),
		amount: TOTAL_AMOUNT / 10,
	},
	reference: {
		table: reference,
		generateFn: () => generateReference(faker),
		amount: TOTAL_AMOUNT / 10,
	},
	magazine: {
		table: magazine,
		generateFn: () => generateMagazine(faker),
		amount: TOTAL_AMOUNT / 10,
	},
	book: {
		table: book,
		generateFn: () => generateBook(faker),
		amount: TOTAL_AMOUNT / 10,
	},
	author: {
		table: author,
		generateFn: () => generateAuthor(faker),
		amount: TOTAL_AMOUNT,
	},
	author_document: {
		table: author_document,
		generateFn: () => generateAuthorDocument(faker),
		amount: TOTAL_AMOUNT,
	},
	email: {
		table: email,
		generateFn: () => generateEmail(faker),
		amount: TOTAL_AMOUNT,
	},
	email_library: {
		table: email_library,
		generateFn: () => generateEmailLibrary(faker),
		amount: TOTAL_AMOUNT / 3,
	},
	email_room: {
		table: email_room,
		generateFn: () => generateEmailRoom(faker),
		amount: TOTAL_AMOUNT / 3,
	},
	email_collection: {
		table: email_collection,
		generateFn: () => generateEmailCollection(faker),
		amount: TOTAL_AMOUNT / 3,
	},
	member: {
		table: member,
		generateFn: () => generateMember(faker),
		amount: TOTAL_AMOUNT,
	},
	researcher: {
		table: researcher,
		generateFn: () => generateResearcher(faker),
		amount: TOTAL_AMOUNT,
	},
	professional: {
		table: professional,
		generateFn: () => generateProfessional(faker),
		amount: TOTAL_AMOUNT,
	},
	student: {
		table: student,
		generateFn: () => generateStudent(faker),
		amount: TOTAL_AMOUNT,
	},
	phone: {
		table: phone,
		generateFn: () => generatePhone(faker),
		amount: TOTAL_AMOUNT,
	},
	phone_library: {
		table: phone_library,
		generateFn: () => generatePhoneLibrary(faker),
		amount: TOTAL_AMOUNT,
	},
	phone_room: {
		table: phone_room,
		generateFn: () => generatePhoneRoom(faker),
		amount: TOTAL_AMOUNT,
	},
	service: {
		table: service,
		generateFn: () => generateService(faker),
		amount: TOTAL_AMOUNT,
	},
	service_room: {
		table: service_room,
		generateFn: () => generateServiceRoom(faker),
		amount: TOTAL_AMOUNT,
	},
	service_member: {
		table: service_member,
		generateFn: () => generateServiceMember(faker),
		amount: TOTAL_AMOUNT,
	},
	loan: {
		table: loan,
		generateFn: () => generateLoan(faker),
		amount: TOTAL_AMOUNT,
	},
	loan_researcher: {
		table: loan_researcher,
		generateFn: () => generateLoanResearcher(faker),
		amount: TOTAL_AMOUNT,
	},
	loan_professional: {
		table: loan_professional,
		generateFn: () => generateLoanProfessional(faker),
		amount: TOTAL_AMOUNT,
	},
	loan_library: {
		table: loan_library,
		generateFn: () => generateLoanLibrary(faker),
		amount: TOTAL_AMOUNT,
	},
	fine: {
		table: fine,
		generateFn: () => generateFine(faker),
		amount: TOTAL_AMOUNT,
	},
};
