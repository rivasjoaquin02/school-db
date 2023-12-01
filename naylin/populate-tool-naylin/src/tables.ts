import { PgTable } from "drizzle-orm/pg-core/table";
import {
	persona,
	estudiante,
	profesor,
	libro,
	prestamo,
	perdida,
	autor,
	autorLibro,
} from "../drizzle/schema";
import {
	generateAutor,
	generateAutorLibro,
	generateEstudiante,
	generateLibro,
	generatePerdida,
	generatePersona,
	generatePrestamo,
	generateProfesor,
} from "./generate/generator";
import { faker } from "@faker-js/faker";

export type Table<T extends PgTable = PgTable> = {
	table: T;
	generateFn: () => Promise<T["$inferInsert"]>;
	amount: number;
};

export type Tables = Record<string, Table>;

const TOTAL_AMOUNT = 200_000;

export const tables = {
	persona: {
		table: persona,
		generateFn: () => generatePersona(faker),
		amount: TOTAL_AMOUNT,
	},
	estudiante: {
		table: estudiante,
		generateFn: () => generateEstudiante(faker),
		amount: TOTAL_AMOUNT / 2,
	},
	profesor: {
		table: profesor,
		generateFn: () => generateProfesor(),
		amount: TOTAL_AMOUNT / 2,
	},
	libro: {
		table: libro,
		generateFn: () => generateLibro(faker),
		amount: TOTAL_AMOUNT,
	},
	prestamo: {
		table: prestamo,
		generateFn: () => generatePrestamo(faker),
		amount: TOTAL_AMOUNT,
	},
	perdida: {
		table: perdida,
		generateFn: () => generatePerdida(faker),
		amount: TOTAL_AMOUNT,
	},
	autor: {
		table: autor,
		generateFn: () => generateAutor(faker),
		amount: TOTAL_AMOUNT,
	},
	autorLibro: {
		table: autorLibro,
		generateFn: () => generateAutorLibro(),
		amount: TOTAL_AMOUNT,
	},
};
