import { sql } from "drizzle-orm";
import { db } from "../db/db";
import { autor, libro, persona, prestamo } from "../../drizzle/schema";
import { pickRandom } from "./pick-random";

export const getIdsPersona = db
	.select({ solapin: persona.solapin })
	.from(persona)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_persona");

export const getTotalPersona = db
	.select({ count: sql`COUNT(*)` })
	.from(persona)
	.prepare("total_persona");

export const getIdsBook = db
	.select({ codigo: libro.codigo })
	.from(libro)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_book");

export const getTotalBook = db
	.select({ count: sql`COUNT(*)` })
	.from(libro)
	.prepare("total_book");

export const getIdsPrestamo = db
	.select({ numeroPrestamo: prestamo.numeroPrestamo })
	.from(prestamo)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_prestamo");

export const getTotalPrestamo = db
	.select({ count: sql`COUNT(*)` })
	.from(prestamo)
	.prepare("total_prestamo");

export const getIdsAuthor = db
	.select({ idAutor: autor.idAutor })
	.from(autor)
	.limit(sql.placeholder("limit"))
	.offset(sql.placeholder("offset"))
	.prepare("id_author");

export const getTotalAuthor = db
	.select({ count: sql`COUNT(*)` })
	.from(autor)
	.prepare("total_autor");

export const getRandomSolapin = async (): Promise<string> => {
	const [{ count }] = await getTotalPersona.execute();
	const idsPersona = await getIdsPersona.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});
	const { solapin } = pickRandom(idsPersona);
	return solapin;
};

export const getRandomIdBook = async (): Promise<string> => {
	const [{ count }] = await getTotalBook.execute();
	const idsLibro = await getIdsBook.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});
	const { codigo } = pickRandom(idsLibro);
	return codigo;
};

export const getRandomNumeroPrestamo = async (): Promise<number> => {
	const [{ count }] = await getTotalPrestamo.execute();
	const idsPrestamo = await getIdsPrestamo.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});
	const { numeroPrestamo } = pickRandom(idsPrestamo);
	return numeroPrestamo;
};

export const getRandomIdAuthor = async (): Promise<number> => {
	const [{ count }] = await getTotalAuthor.execute();
	const idsAuthor = await getIdsAuthor.execute({
		limit: 100,
		offset: Math.floor(Math.random() * Number(count)),
	});
	const { idAutor } = pickRandom(idsAuthor);
	return idAutor;
};
