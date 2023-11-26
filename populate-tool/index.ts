import { faker } from "@faker-js/faker";
import { generateLibrary, library } from "./schema/library";
import { db } from "./db";
import { PgTable } from "drizzle-orm/pg-core";
import { generateRoom, room } from "./schema/room";
import { collection } from "./schema/collection";
import {
	book,
	document,
	document_collection,
	generateBook,
	generateDocument,
	generateDocument_collection,
	generateMagazine,
	generateManuscript,
	generateMap,
	generateMedia,
	generateMusic,
	generatePaint,
	generatePicture,
	generateReference,
	magazine,
	manuscript,
	map,
	media,
	music,
	paint,
	picture,
	reference,
} from "./schema/document";
import {
	author,
	author_document,
	generateAuthor,
	generateAuthorDocument,
} from "./schema/author";
import {
	email,
	email_library,
	email_room,
	generateEmail,
	generateEmailLibrary,
	generateEmailRoom,
} from "./schema/email";
import {
	generateMember,
	generateProfessional,
	generateResearcher,
	generateStudent,
	member,
	professional,
	researcher,
	student,
} from "./schema/member";
import {
	generatePhone,
	generatePhoneLibrary,
	generatePhoneRoom,
	phone,
	phone_library,
	phone_room,
} from "./schema/phone";
import {
	fine,
	generateFine,
	generateLoan,
	generateLoanLibrary,
	generateLoanProfessional,
	generateLoanResearcher,
	generateService,
	generateServiceMember,
	generateServiceRoom,
	loan,
	loan_library,
	loan_professional,
	loan_researcher,
	service,
	service_member,
	service_room,
} from "./schema/service";

// await db
// 	.insert(library)
// 	.values({
// 		id_library: 1,
// 		name_library: "Biblioteca Nacional Jose Marti",
// 		location_library: "habana",
// 		description_library: "Biblioteca Nacional Jose Marti",
// 		website: "http://www.bnjm.cu/",
// 	})
// 	.onConflictDoNothing();

type Table = {
	table: PgTable;
	generateFn: () => any;
	amount: number;
};

async function populate<T>({ table, generateFn, amount }: Table) {
	const startTime = performance.now();

	const chunkSize = 1000;
	const amountChunks = Math.floor(amount / chunkSize);

	for (let i = 0; i < amountChunks; i++) {
		let chunk: T[] = [];
		for (let j = 0; j < chunkSize; j++) chunk.push(await generateFn());
		await db
			.insert(table)
			.values(chunk)
			.onConflictDoNothing()
			.catch((e) => console.count(e.message));
	}

	const timeTook = performance.now() - startTime;
	console.log(`⏱️  : ${timeTook}ms`);
}

const tables: Table[] = [
	{
		table: library,
		generateFn: () => generateLibrary(faker),
		amount: 1000_000,
	},
	{
		table: room,
		generateFn: () => generateRoom(faker),
		amount: 1000_000,
	},
	{
		table: collection,
		generateFn: () => generateRoom(faker),
		amount: 1000_000,
	},
	{
		table: document,
		generateFn: () => generateDocument(faker),
		amount: 1000_000,
	},
	{
		table: document_collection,
		generateFn: () => generateDocument_collection(faker),
		amount: 60_000,
	},
	{
		table: manuscript,
		generateFn: () => generateManuscript(faker),
		amount: 60_000,
	},
	{ table: map, generateFn: () => generateMap(faker), amount: 60_000 },
	{
		table: picture,
		generateFn: () => generatePicture(faker),
		amount: 60_000,
	},
	{ table: paint, generateFn: () => generatePaint(faker), amount: 60_000 },
	{ table: media, generateFn: () => generateMedia(faker), amount: 60_000 },
	{ table: music, generateFn: () => generateMusic(faker), amount: 60_000 },
	{
		table: reference,
		generateFn: () => generateReference(faker),
		amount: 60_000,
	},
	{
		table: magazine,
		generateFn: () => generateMagazine(faker),
		amount: 60_000,
	},
	{ table: book, generateFn: () => generateBook(faker), amount: 60_000 },
	{ table: author, generateFn: () => generateAuthor(faker), amount: 150_000 },
	{
		table: author_document,
		generateFn: () => generateAuthorDocument(faker),
		amount: 150_000,
	},
	{ table: email, generateFn: () => generateEmail(faker), amount: 150_000 },
	{
		table: email_library,
		generateFn: () => generateEmailLibrary(faker),
		amount: 150_000,
	},
	{
		table: email_room,
		generateFn: () => generateEmailRoom(faker),
		amount: 150_000,
	},
	{ table: member, generateFn: () => generateMember(faker), amount: 150_000 },
	{
		table: researcher,
		generateFn: () => generateResearcher(faker),
		amount: 150_000,
	},
	{
		table: professional,
		generateFn: () => generateProfessional(faker),
		amount: 150_000,
	},
	{
		table: student,
		generateFn: () => generateStudent(faker),
		amount: 150_000,
	},
	{ table: phone, generateFn: () => generatePhone(faker), amount: 150_000 },
	{
		table: phone_library,
		generateFn: () => generatePhoneLibrary(faker),
		amount: 150_000,
	},
	{
		table: phone_room,
		generateFn: () => generatePhoneRoom(faker),
		amount: 150_000,
	},
	{
		table: service,
		generateFn: () => generateService(faker),
		amount: 150_000,
	},
	{
		table: service_room,
		generateFn: () => generateServiceRoom(faker),
		amount: 150_000,
	},
	{
		table: service_member,
		generateFn: () => generateServiceMember(faker),
		amount: 150_000,
	},
	{ table: loan, generateFn: () => generateLoan(faker), amount: 150_000 },
	{
		table: loan_researcher,
		generateFn: () => generateLoanResearcher(faker),
		amount: 150_000,
	},
	{
		table: loan_professional,
		generateFn: () => generateLoanProfessional(faker),
		amount: 150_000,
	},
	{
		table: loan_library,
		generateFn: () => generateLoanLibrary(faker),
		amount: 150_000,
	},
	{ table: fine, generateFn: () => generateFine(faker), amount: 150_000 },
	{ table: loan, generateFn: () => generateLoan(faker), amount: 150_000 },
];

Promise.all(tables.map(async (table) => await populate({ ...table })))
	.then(() => {
		console.log("👍 done");
	})
	.catch((e) => console.error(e));
