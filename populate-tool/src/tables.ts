import { Faker, faker } from "@faker-js/faker";
import { PgTable } from "drizzle-orm/pg-core";
import { library } from "./schema/library/library.ts";
import { room } from "./schema/room/room.ts";

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

import { generateRoom } from "./schema/room/index.ts";

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
import { generateEmailCollection } from "./schema/email/generate.ts";

export type Table = {
	table: PgTable;
	generateFn: () => Promise<any>;
	amount: number;
};

export type Tables = Record<string, Table>;

export const tables: Tables = {
	library: {
		table: library,
		generateFn: () => generateLibrary(faker),
		amount: 500_000,
	},
	room: {
		table: room,
		generateFn: () => generateRoom(faker),
		amount: 500_000,
	},
	collection: {
		table: collection,
		generateFn: () => generateCollection(faker),
		amount: 500_000,
	},
	document: {
		table: document,
		generateFn: () => generateDocument(faker),
		amount: 500_000,
	},
	document_collection: {
		table: document_collection,
		generateFn: () => generateDocumentCollection(),
		amount: 50_000,
	},
	manuscript: {
		table: manuscript,
		generateFn: () => generateManuscript(faker),
		amount: 50_000,
	},
	map: {
		table: map,
		generateFn: () => generateMap(faker),
		amount: 50_000,
	},
	picture: {
		table: picture,
		generateFn: () => generatePicture(faker),
		amount: 50_000,
	},
	paint: {
		table: paint,
		generateFn: () => generatePaint(faker),
		amount: 50_000,
	},
	media: {
		table: media,
		generateFn: () => generateMedia(faker),
		amount: 50_000,
	},
	music: {
		table: music,
		generateFn: () => generateMusic(faker),
		amount: 50_000,
	},
	reference: {
		table: reference,
		generateFn: () => generateReference(faker),
		amount: 50_000,
	},
	magazine: {
		table: magazine,
		generateFn: () => generateMagazine(faker),
		amount: 50_000,
	},
	book: {
		table: book,
		generateFn: async () => await generateBook(faker),
		amount: 50_000,
	},
	author: {
		table: author,
		generateFn: () => generateAuthor(faker),
		amount: 500_000,
	},
	author_document: {
		table: author_document,
		generateFn: () => generateAuthorDocument(faker),
		amount: 500_000,
	},
	email: {
		table: email,
		generateFn: () => generateEmail(faker),
		amount: 500_000,
	},
	email_library: {
		table: email_library,
		generateFn: () => generateEmailLibrary(),
		amount: 500_000,
	},
	email_room: {
		table: email_room,
		generateFn: () => generateEmailRoom(),
		amount: 500_000,
	},
	email_collection: {
		table: email_collection,
		generateFn: () => generateEmailCollection(),
		amount: 500_000,
	},
	member: {
		table: member,
		generateFn: () => generateMember(faker),
		amount: 500_000,
	},
	researcher: {
		table: researcher,
		generateFn: () => generateResearcher(),
		amount: 500_000,
	},
	professional: {
		table: professional,
		generateFn: () => generateProfessional(faker),
		amount: 500_000,
	},
	student: {
		table: student,
		generateFn: () => generateStudent(faker),
		amount: 500_000,
	},
	phone: {
		table: phone,
		generateFn: () => generatePhone(faker),
		amount: 500_000,
	},
	phone_library: {
		table: phone_library,
		generateFn: () => generatePhoneLibrary(faker),
		amount: 500_000,
	},
	phone_room: {
		table: phone_room,
		generateFn: () => generatePhoneRoom(faker),
		amount: 500_000,
	},
	service: {
		table: service,
		generateFn: () => generateService(faker),
		amount: 500_000,
	},
	service_room: {
		table: service_room,
		generateFn: () => generateServiceRoom(),
		amount: 500_000,
	},
	service_member: {
		table: service_member,
		generateFn: () => generateServiceMember(),
		amount: 500_000,
	},
	loan: {
		table: loan,
		generateFn: () => generateLoan(faker),
		amount: 500_000,
	},
	loan_researcher: {
		table: loan_researcher,
		generateFn: () => generateLoanResearcher(),
		amount: 500_000,
	},
	loan_professional: {
		table: loan_professional,
		generateFn: () => generateLoanProfessional(),
		amount: 500_000,
	},
	loan_library: {
		table: loan_library,
		generateFn: () => generateLoanLibrary(),
		amount: 500_000,
	},
	fine: {
		table: fine,
		generateFn: () => generateFine(faker),
		amount: 500_000,
	},
};
