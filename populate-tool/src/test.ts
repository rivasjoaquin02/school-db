import { tables } from "./tables.ts";
const { table, generateFn, amount } = tables["book"];

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { Faker, faker } from "@faker-js/faker";
import { document } from "./schema/document/document.ts";
import { pickRandom } from "./utils/pick-random.ts";
import { Book } from "./schema/document/types.ts";
import { generateIsbn } from "./schema/document/generate.ts";
import { sql } from "drizzle-orm";
import { generateFine } from "./schema/service/generate.ts";
import {
	author_document,
	generateAuthorDocument,
	getTotalAuthors,
} from "./schema/author/index.ts";
import { db } from "./db.ts";

// const DEFAULT_CONFIG = {
// 	host: process.env.POSTGRES_HOST ?? "localhost",
// 	port: Number(process.env.POSTGRES_PORT) ?? 5432,
// 	user: process.env.POSTGRES_USER ?? "postgres",
// 	password: process.env.POSTGRES_PASSWORD ?? "1234",
// 	db: process.env.POSTGRES_DATABASE ?? "library_db",
// };

// const queryClient = postgres(DEFAULT_CONFIG);
// const db = drizzle(queryClient);

// const values = [];

// export const getAmountDocuments = db
// 	.select({ count: sql`COUNT(*)` })
// 	.from(document)
// 	.prepare("amount_document");

// const r = await getAmountDocuments.execute();
// const { count } = r[0];

// export const getIdDocument = db
// 	.select({ id_document: document.id_document })
// 	.from(document)
// 	.limit(sql.placeholder("limit"))
// 	.offset(sql.placeholder("offset"))
// 	.prepare("id_document");

// const generateBook = async (faker: Faker): Promise<Book> => {
// 	// const { id_document } = pickRandom(await getIdDocument.execute());
// 	const id_document = 1;

// 	return {
// 		id_document,
// 		genre: faker.lorem.sentence(10),
// 		issn: `${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int(
// 			{ min: 1000, max: 9999 }
// 		)}`,
// 		isbn: await generateIsbn(faker),
// 		dewey: faker.number.int(10000),
// 	};
// };

// for (let i = 0; i < 1_000; i++) {
// 	values.push(await generateBook(faker));
// }

// console.log(values.length);

// const ids = await getIdDocument.execute({
// 	limit: 100,
// 	offset: faker.number.int(1000_000),
// });
// console.log(ids.length);

// console.log("fin");

import { populate } from "./utils/populate.ts";
import { generateCollection } from "./schema/collection/index.ts";
await populate({ ...tables["collection"], amount: 1_00_000 });

console.log("d");

// const [{ count: totalAuthors }] = await getTotalAuthors.execute();
// console.log(Number(totalAuthors));

console.log(await generateCollection(faker));
