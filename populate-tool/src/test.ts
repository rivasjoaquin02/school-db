import { match } from "ts-pattern";
import { populate } from "./utils/populate";
import { faker } from "@faker-js/faker";
import { log } from "sys";
import { db } from "./db/db";
import {
	book,
	generateBook,
	magazine,
	generateMagazine,
	reference,
	generateReference,
	music,
	generateMusic,
	media,
	generateMedia,
	paint,
	generatePaint,
	picture,
	generatePicture,
	map,
	generateMap,
	manuscript,
	generateManuscript,
	DocumentSelect,
	document_collection,
	generateDocument,
	generateDocumentCollection,
	document,
} from "./schema/document";
import {
	MemberSelect,
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
	author,
	generateAuthor,
	author_document,
	generateAuthorDocument,
} from "./schema/author";
import { collection, generateCollection } from "./schema/collection";
import {
	email,
	generateEmail,
	email_library,
	generateEmailLibrary,
	email_room,
	generateEmailRoom,
	email_collection,
} from "./schema/email";
import { generateEmailCollection } from "./schema/email/generate";
import { library, generateLibrary } from "./schema/library";
import {
	phone,
	generatePhone,
	phone_library,
	generatePhoneLibrary,
	phone_room,
	generatePhoneRoom,
} from "./schema/phone";
import { room, generateRoom } from "./schema/room";
import {
	service,
	generateService,
	service_room,
	generateServiceRoom,
	service_member,
	generateServiceMember,
	loan,
	generateLoan,
	loan_researcher,
	generateLoanMember,
	loan_professional,
	loan_library,
	generateLoanLibrary,
	fine,
	generateFine,
} from "./schema/service";
import {
	getTotalLibrary,
	getIdsLibrary,
	getTotalRoom,
	getIdsRoom,
	getTotalDocuments,
	getIdsDocument,
	getTotalCollections,
	getIdsCollection,
	getTotalAuthors,
	getIdsAuthor,
	getTotalEmails,
	getEmails,
	getTotalMember,
	getIdsMember,
	getTotalPhone,
	getPhoneNumbers,
	getTotalServices,
	getIdsService,
	getTotalLoan,
	getIdsLoan,
} from "./utils/get-ids";
import { getRandomId } from "./utils/get-random";

// FAST
// await populate({...tables.service, amount: 100});
// await populate(tables.service);
// await populate(tables.member);
// await populate(tables.author);
// await populate(tables.email);
// await populate(tables.phone);
// await populate(tables.library);
// await populate(tables.collection);

// MEDIUM
// await populate(tables.document);
// await populate(tables.fine);
// await populate(tables.book);
// await populate(tables.magazine);
// await populate(tables.reference);
// await populate(tables.music);
// await populate(tables.room);

// TOO SLOW
// await populate(tables.student);
// await populate(tables.author_document);
// await populate(tables.loan);
// await populate(tables.email_library);
// await populate(tables.phone_library);
// await populate(tables.loan_library);

// TODO: error here
// await populate(tables.service_member);
// await populate(tables.professional);
// await populate(tables.loan_professional); //solo lleno 87
// await populate(tables.loan_researcher); //no lleno nada

// await populate(tables.media);
// await populate(tables.paint);
// await populate(tables.picture);
// await populate(tables.map);
// await populate(tables.manuscript);

// await populate(tables.email_collection);
// await populate(tables.document_collection);
// await populate(tables.email_room);
// await populate(tables.phone_room);
// await populate(tables.service_room);
console.log("👍 done");

// console.log(getOrderOfTables());

// function getStatusMessage(status: string): string {
// 	return match(status)
// 		.with("success", () => "Operation succeeded!")
// 		.with("error", () => "An error occurred.")
// 		.otherwise(() => "Unknown status.");
// }



// console.log(await getTotalAuthors.execute());

console.log(library['id_library'].name);
