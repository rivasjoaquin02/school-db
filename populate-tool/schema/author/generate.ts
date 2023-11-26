import { Faker } from "@faker-js/faker";
import { db } from "../../db.ts";
import { pickRandom } from "../../utils/pick-random.ts";
import { author } from "./author.ts";
import { Author, AuthorDocument } from "./types.ts";
import { getIdDocument } from "../document/generate.ts";

export const generateAuthor = async (faker: Faker): Promise<Author> => {
	return {
		name_author: faker.person.fullName(),
		country_author: pickRandom(["Cuba", faker.location.country()]),
		description_author: faker.lorem.paragraph(),
	};
};

export const getIdAuthor = db
	.select({ id_author: author.id_author })
	.from(author)
	.prepare("id_author");

export const generateAuthorDocument = async (): Promise<AuthorDocument> => {
	const { id_author } = pickRandom(await getIdAuthor.execute());
	const { id_document } = pickRandom(await getIdDocument.execute());

	return {
		id_author,
		id_document,
	};
};
