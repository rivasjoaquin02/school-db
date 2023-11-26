import { db } from "../db";
import { Tables, tables } from "../tables";

const test = async (tables: Tables, testAmount: number) => {
	for (const t of Object.values(tables)) {
		const startTime = performance.now();

		const { table, generateFn } = t;

		for (let j = 0; j < testAmount; j++) {
			await db
				.insert(table)
				.values(await generateFn())
				.onConflictDoNothing();
		}

		const endTime = performance.now() - startTime;
		console.log(`⏱️  : ${endTime}ms`);
	}
};

test(tables, 1000).then(() => console.log("👍 done"));
