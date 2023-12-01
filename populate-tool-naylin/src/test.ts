import { faker } from "@faker-js/faker";
import {
	generatePersona,
	generateEstudiante,
	generateProfesor,
	generateLibro,
	generatePrestamo,
	generatePerdida,
	generateAutor,
	generateAutorLibro,
} from "./generate/generator";
import { populate } from "./utils/populate";
import { tables } from "./tables";
import { db } from "./db/db";

await populate(tables.persona);
console.log("done");
await populate(tables.estudiante);
console.log("done");
await populate(tables.profesor);
console.log("done");

await populate(tables.libro);
await populate(tables.prestamo);
await populate(tables.perdida);
await populate(tables.autor);
await populate(tables.autorLibro);

// await db
// 	.insert(tables.persona.table)
// 	.values(await generatePersona(faker))
// 	.onConflictDoNothing()
// 	.catch((err: Error) => console.log(err.message));


console.log("done");
