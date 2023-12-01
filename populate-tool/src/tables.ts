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
	generateLoanMember,
	generateLoanLibrary,
	generateFine,
} from "./schema/service/index.ts";
import { room, generateRoom } from "./schema/room/index.ts";
import { generateEmailCollection } from "./schema/email/generate.ts";
import {
	getRandomIdLibrary,
	getRandomIdRoom,
	getRandomIdDocument,
	getRandomIdCollection,
	getRandomIdAuthor,
	getRandomEmail,
	getRandomIdMember,
	getRandomPhoneNumber,
	getRandomIdService,
	getRandomIdLoan,
	getRandomIdResearcher,
	getRandomIdProfessional,
} from "./utils/get-random.ts";

const TOTAL_AMOUNT = 200_000;

import { PgTable } from "drizzle-orm/pg-core/table";

export type Table<T extends PgTable = PgTable> = {
	table: T;
	generateFn: () => Promise<T["$inferInsert"]>;
	amount: number;
};

export type Tables = Record<string, Table>;

export const tables = {
	library: {
		table: library,
		generateFn: () => generateLibrary(faker),
		amount: TOTAL_AMOUNT,
	},
	room: {
		table: room,
		generateFn: async () =>
			generateRoom({
				faker,
				id_library: await getRandomIdLibrary(),
			}),
		amount: TOTAL_AMOUNT,
	},
	collection: {
		table: collection,
		generateFn: async () =>
			generateCollection({
				faker,
				id_room: await getRandomIdRoom(),
			}),
		amount: TOTAL_AMOUNT,
	},
	document: {
		table: document,
		generateFn: () => generateDocument(faker),
		amount: TOTAL_AMOUNT,
		manuscript: {
			table: manuscript,
			generateFn: async () =>
				generateManuscript({
					faker,
					id_document: await getRandomIdDocument(),
				}),
			amount: TOTAL_AMOUNT / 10,
		},
		map: {
			table: map,
			generateFn: async () =>
				generateMap({
					faker,
					id_document: await getRandomIdDocument(),
				}),
			amount: TOTAL_AMOUNT / 10,
		},
		picture: {
			table: picture,
			generateFn: async () =>
				generatePicture({
					faker,
					id_document: await getRandomIdDocument(),
				}),
			amount: TOTAL_AMOUNT / 10,
		},
		paint: {
			table: paint,
			generateFn: async () =>
				generatePaint({
					faker,
					id_document: await getRandomIdDocument(),
				}),
			amount: TOTAL_AMOUNT / 10,
		},
		media: {
			table: media,
			generateFn: async () =>
				generateMedia({
					faker,
					id_document: await getRandomIdDocument(),
				}),
			amount: TOTAL_AMOUNT / 10,
		},
		music: {
			table: music,
			generateFn: async () =>
				generateMusic({
					faker,
					id_document: await getRandomIdDocument(),
				}),
			amount: TOTAL_AMOUNT / 10,
		},
		reference: {
			table: reference,
			generateFn: async () =>
				generateReference({
					faker,
					id_document: await getRandomIdDocument(),
				}),
			amount: TOTAL_AMOUNT / 10,
		},
		magazine: {
			table: magazine,
			generateFn: async () =>
				generateMagazine({
					faker,
					id_document: await getRandomIdDocument(),
				}),
			amount: TOTAL_AMOUNT / 10,
		},
		book: {
			table: book,
			generateFn: async () =>
				generateBook({
					faker,
					id_document: await getRandomIdDocument(),
				}),
			amount: TOTAL_AMOUNT / 10,
		},
	},
	document_collection: {
		table: document_collection,
		generateFn: async () =>
			generateDocumentCollection({
				id_document: await getRandomIdDocument(),
				id_collection: await getRandomIdCollection(),
			}),
		amount: TOTAL_AMOUNT / 10,
	},

	author: {
		table: author,
		generateFn: () => generateAuthor(faker),
		amount: TOTAL_AMOUNT,
	},
	author_document: {
		table: author_document,
		generateFn: async () =>
			generateAuthorDocument({
				id_author: await getRandomIdAuthor(),
				id_document: await getRandomIdDocument(),
			}),
		amount: TOTAL_AMOUNT,
	},
	email: {
		table: email,
		generateFn: () => generateEmail(faker),
		amount: TOTAL_AMOUNT,
	},
	email_library: {
		table: email_library,
		generateFn: async () =>
			generateEmailLibrary({
				email: await getRandomEmail(),
				id_library: await getRandomIdLibrary(),
			}),
		amount: TOTAL_AMOUNT / 3,
	},
	email_room: {
		table: email_room,
		generateFn: async () =>
			generateEmailRoom({
				email: await getRandomEmail(),
				id_room: await getRandomIdRoom(),
			}),
		amount: TOTAL_AMOUNT / 3,
	},
	email_collection: {
		table: email_collection,
		generateFn: async () =>
			generateEmailCollection({
				email: await getRandomEmail(),
				id_collection: await getRandomIdCollection(),
			}),
		amount: TOTAL_AMOUNT / 3,
	},
	member: {
		table: member,
		generateFn: () => generateMember(faker),
		amount: TOTAL_AMOUNT,
	},
	researcher: {
		table: researcher,
		generateFn: async () =>
			generateResearcher({
				id_member: await getRandomIdMember(),
			}),
		amount: TOTAL_AMOUNT,
	},
	professional: {
		table: professional,
		generateFn: async () =>
			generateProfessional({
				faker,
				id_member: await getRandomIdMember(),
			}),
		amount: TOTAL_AMOUNT,
	},
	student: {
		table: student,
		generateFn: async () =>
			generateStudent({
				faker,
				id_member: await getRandomIdMember(),
			}),
		amount: TOTAL_AMOUNT,
	},
	phone: {
		table: phone,
		generateFn: () => generatePhone(faker),
		amount: TOTAL_AMOUNT,
	},
	phone_library: {
		table: phone_library,
		generateFn: async () =>
			generatePhoneLibrary({
				id_library: await getRandomIdLibrary(),
				phone_number: await getRandomPhoneNumber(),
			}),
		amount: TOTAL_AMOUNT,
	},
	phone_room: {
		table: phone_room,
		generateFn: async () =>
			generatePhoneRoom({
				phone_number: await getRandomPhoneNumber(),
				id_room: await getRandomIdRoom(),
			}),
		amount: TOTAL_AMOUNT,
	},
	service: {
		table: service,
		generateFn: () => generateService(faker),
		amount: TOTAL_AMOUNT,
	},
	service_room: {
		table: service_room,
		generateFn: async () =>
			generateServiceRoom({
				id_service: await getRandomIdService(),
				id_room: await getRandomIdRoom(),
			}),
		amount: TOTAL_AMOUNT,
	},
	service_member: {
		table: service_member,
		generateFn: async () =>
			generateServiceMember({
				id_service: await getRandomIdService(),
				id_member: await getRandomIdMember(),
			}),
		amount: TOTAL_AMOUNT,
	},
	loan: {
		table: loan,
		generateFn: async () =>
			generateLoan({
				faker,
				id_service: await getRandomIdService(),
				id_document: await getRandomIdDocument(),
			}),
		amount: TOTAL_AMOUNT,
	},
	loan_researcher: {
		table: loan_researcher,
		generateFn: async () => {
			const { id_service, id_document } = await getRandomIdLoan();
			return generateLoanMember({
				id_service,
				id_document,
				id_member: await getRandomIdResearcher(),
			});
		},
		amount: TOTAL_AMOUNT,
	},
	loan_professional: {
		table: loan_professional,
		generateFn: async () => {
			const { id_service, id_document } = await getRandomIdLoan();
			return generateLoanMember({
				id_service,
				id_document,
				id_member: await getRandomIdProfessional(),
			});
		},
		amount: TOTAL_AMOUNT,
	},
	loan_library: {
		table: loan_library,
		generateFn: async () => {
			const { id_service, id_document } = await getRandomIdLoan();

			return generateLoanLibrary({
				id_service,
				id_document,
				id_library: await getRandomIdLibrary(),
				id_library2: await getRandomIdLibrary(),
			});
		},
		amount: TOTAL_AMOUNT,
	},
	fine: {
		table: fine,
		generateFn: async () => {
			const { id_service, id_document } = await getRandomIdLoan();
			return generateFine({ faker, id_service, id_document });
		},
		amount: TOTAL_AMOUNT,
	},
};
