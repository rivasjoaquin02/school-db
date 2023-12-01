import { populate } from "./utils/populate";
import { tables } from "./tables";
import { db } from "./db/db";
import { log } from "./app";

// await populate(tables.persona);
// console.log("persona: 👍");
// await populate(tables.estudiante);
// console.log("estudiante: 👍");
// await populate(tables.profesor);
// console.log("profesor: 👍");
// await populate(tables.libro);
// console.log("libro: 👍");
// await populate(tables.prestamo);
// console.log("prestamo: 👍");
// await populate(tables.perdida);
// console.log("perdida: 👍");

await populate(tables.autor);
console.log("autor: 👍");
await populate(tables.autorLibro);
console.log("autorLibro: 👍");

// await db
// 	.insert(tables.persona.table)
// 	.values(await generatePersona(faker))
// 	.onConflictDoNothing()
// 	.catch((err: Error) => console.log(err.message));

console.log("done");
