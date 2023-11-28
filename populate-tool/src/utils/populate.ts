import { LogFn } from "..";
import { db } from "../db.ts";
import { type Table } from "../tables.ts";

type Populate = Table & { log?: LogFn };

export async function populate<T>({
	table,
	generateFn,
	amount,
	log,
}: Populate) {
	const chunkSize = 10;
	const amountChunks = Math.floor(
		Math.max(amount, chunkSize) / Math.min(amount, chunkSize)
	);

	for (let i = 0; i < amountChunks; i++) {
		let chunk: T[] = [];

		for (let j = 0; j < chunkSize; j++) {
			const value: T = await generateFn();
			chunk.push(value);
		}

		await db
			.insert(table)
			.values(chunk)
			.onConflictDoNothing()
			.catch((err: Error) => log?.error(err.message));
		// console.log(chunk.length);
	}
}
