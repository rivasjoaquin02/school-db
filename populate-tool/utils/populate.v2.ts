
// function populate<T>(table: PgTable) {
// 	let generateFn: () => T;
// 	let amountIterations = 0;

// 	return {
// 		setGenerateFn: (generateFn: () => T) => {
// 			generateFn = generateFn;
// 			return this;
// 		},
// 		setAmountIterations: (amount: number) => {
// 			amountIterations = amount;
// 			return this;
// 		},
// 		build: () => {
// 			return async () => {
// 				const startTime = performance.now();

// 				const chunkSize = 1000;
// 				const amountChunks = amountIterations / chunkSize;

// 				for (let i = 0; i < amountChunks; i++) {
// 					let data: T[] = [];
// 					for (let j = 0; j < chunkSize; j++) data.push(generateFn());
// 					await db
// 						.insert(table)
// 						.values(data)
// 						.onConflictDoNothing()
// 						.catch((e) => console.count(e.message));
// 				}

// 				const timeTaken = performance.now() - startTime;
// 				console.log(`Execution Time: ${timeTaken} ms`);
// 			};
// 		},
// 	};
// }
