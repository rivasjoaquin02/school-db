import { Logger, ILogObj } from "tslog";
import { populate } from "./utils/populate.ts";
import { getOrderOfTables } from "./utils/topo-sort.ts";
import { tables } from "./tables.ts";

export type LogFn = Logger<ILogObj>;
const log: LogFn = new Logger();

const totalStartTime = performance.now();

for (const tableName of getOrderOfTables()) {
	if (!tables[tableName]) continue;

	const { table, generateFn, amount } = tables[tableName];

	const startTime = performance.now();
	await populate({ table, generateFn, amount, log });
	const timeTook = performance.now() - startTime;

	log.info(`${tableName}: ⏱️ ${timeTook.toFixed(4)}ms`);
}

const timeTook = performance.now() - totalStartTime;
log.info(`The total time was: ⏰${timeTook.toFixed(4)}ms`);
