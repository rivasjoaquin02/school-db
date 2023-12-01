import { LogFn } from "../app";
import { db } from "../db/db";
import { Table } from "../tables";
import { matchSpecializations } from "./match-specialization";

type Populate = Table & { log?: LogFn; tableName: string };
export async function populate({
	tableName,
	table,
	generateFn,
	amount,
	log,
}: Populate) {
	for (let i = 0; i < amount; i++) {
		const value: any = await generateFn();

		const inserted = await db
			.insert(table)
			.values(value)
			.onConflictDoNothing()
			.returning()
			.catch((err: Error) =>
				log?.error(`${tableName} -> ${err.message}`)
			);

		await matchSpecializations(tableName, inserted[0]);
	}
}
