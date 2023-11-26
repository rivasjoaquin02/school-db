import { tables } from "./tables.ts";
import { populate } from "./utils/populate.ts";
import { getOrderOfTables } from "./utils/topo-sort.ts";

await Promise.all(
	getOrderOfTables().map(async (tableName) => {
		if (tables.hasOwnProperty(tableName) === false) return;

		const { table, generateFn, amount } = tables[tableName];

		return await populate({ table, generateFn, amount }); //is blocking
	})
);
