import { match } from "ts-pattern";
import { Table, tables } from "./tables";
import { populate } from "./utils/populate";
import { faker } from "@faker-js/faker";
import { log } from "sys";
import { db } from "./db";
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
} from "./schema/document";
import {
	MemberSelect,
	generateProfessional,
	generateResearcher,
	generateStudent,
} from "./schema/member";

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

function getStatusMessage(status: string): string {
	return match(status)
		.with("success", () => "Operation succeeded!")
		.with("error", () => "An error occurred.")
		.otherwise(() => "Unknown status.");
}

console.log(getStatusMessage("success"));

const documentTypeToFunction = {
	book: generateBook,
	magazine: generateMagazine,
	reference: generateReference,
	music: generateMusic,
	media: generateMedia,
	paint: generatePaint,
	picture: generatePicture,
	map: generateMap,
	manuscript: generateManuscript,
};

const memberCategoryToFunction = {
	professional: generateProfessional,
	researcher: generateResearcher,
	student: generateStudent,
};

export async function matchSpecializations(
	tableName: string,
	value: Table
): Promise<void> {
	if (tableName === "document") {
		const { id_document, type_document } = value as any as DocumentSelect;
		const generateFn = documentTypeToFunction[type_document];
		if (generateFn) {
			await db
				.insert(tables[tableName].table)
				.values(await generateFn({ faker, id_document }))
				.onConflictDoNothing()
				.catch((err: Error) =>
					console.log(`${tableName} -> ${err.message}`)
				);
		}
	} else if (tableName === "member") {
		const { id_member, category } = value as any as MemberSelect;
		const generateFn = memberCategoryToFunction[category];
		if (generateFn) {
			await db
				.insert(tables[tableName].table)
				.values(await generateFn({ faker, id_member }))
				.onConflictDoNothing()
				.catch((err: Error) =>
					console.log(`${tableName} -> ${err.message}`)
				);
		}
	}
}
