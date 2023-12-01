import { LogFn } from "../app";
import { db } from "../db/db";
import { Table } from "../tables";
import { matchSpecializations } from "../test";

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

		await db
			.insert(table)
			.values(value)
			.onConflictDoNothing()
			// .then(() => matchSpecializations(tableName, value))
			.catch((err: Error) =>
				log?.error(`${tableName} -> ${err.message}`)
			);

		await matchSpecializations(tableName, value);
	}
}
