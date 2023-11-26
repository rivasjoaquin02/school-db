import { db } from "../db";
import { Table } from "../tables";

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

export async function populate<T>({ table, generateFn, amount }: Table) {
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
	console.log(`⏱️ : ${timeTook}ms`);
}

// Promise.all(tables.map(async (table) => await populate({ ...table })))
// 	.then(() => {
// 		console.log("👍 done");
// 	})
// 	.catch((e) => console.error(e));

// Array.fromAsync({ length: 10 });
