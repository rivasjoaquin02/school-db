import { faker } from "@faker-js/faker";
import { generateIdRoom, generateRoom } from "./schema/room/room.ts";
import { pool } from "./pool/pool.ts";
import { tables } from "./tables.ts";
import { db } from "./db.ts";
import { library } from "./schema/library/library.ts";
import { generateCollection } from "./schema/collection/collection.ts";
import { generatePhone, phone } from "./schema/phone/phone.ts";
import {
	email,
	email_library,
	generateEmail,
	generateEmailLibrary,
} from "./schema/email/email.ts";
import {
	generateMember,
	generateProfessional,
	generateResearcher,
	generateStudent,
	member,
	professional,
	researcher,
	student,
} from "./schema/member/member.ts";
import {
	document,
	generateDocument,
	generateMap,
	getIdDocument,
	map,
} from "./schema/document/document.ts";
import {
	author,
	author_document,
	generateAuthor,
	generateAuthorDocument,
} from "./schema/author/author.ts";
import {
	generateLoan,
	generateLoanResearcher,
	generateService,
	getIdLoan,
	service,
} from "./schema/service/service.ts";
import { pickRandom } from "./utils/pick-random.ts";
import { getOrderByOperators } from "drizzle-orm";
import { getOrderOfTables } from "./utils/topo-sort.ts";

// pool.library.ids.push(1);
// pool.library.ids.push(2);
// pool.library.ids.push(3);
// pool.library.ids.push(4);
// pool.library.ids.push(5);
// pool.library.ids.push(6);

// console.log(pool);

// generateRoom(faker, pool).then((id) => console.log(id));

// console.log(pool);

// const startTime = performance.now();

// await db.select({ id: library.id_library }).from(library);

// const timeTook = performance.now() - startTime;
// console.log(`⏰: ${timeTook}ms`);

// const startTime2 = performance.now();

// const selectId = db
// 	.select({ id: library.id_library })
// 	.from(library)
// 	.prepare("id_library");

// await selectId.execute();

// const timeTook2 = performance.now() - startTime2;
// console.log(`⏰: ${timeTook2}ms`);

// console.log(await generateDocument(faker));

// for (let i = 0; i < 1000; i++)
// 	await db
// 		.insert(service)
// 		.values(await generateService(faker))
// 		.onConflictDoNothing()
// 		.catch((e) => console.count(e.message));

// const { id_service, id_document } = pickRandom(await getIdLoan.execute());

// console.log(await getIdLoan.execute());

// console.log(await generateLoan(faker));


// console.log(getOrderOfTables());

// console.log(id_service, id_document);



console.log(await generateLoanResearcher());
