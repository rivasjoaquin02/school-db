import { Faker } from "@faker-js/faker";
import {
	AuthorDocumentInsert,
	AuthorInsert,
	AuthorSelect,
	getIdAuthor,
	getTotalAuthors,
} from ".";
import { pickRandom } from "../../utils/pick-random";
import { getRandomIdDocument } from "../document/generate";

export const getRandomIdAuthor = async (
	faker: Faker
): Promise<AuthorSelect["id_author"]> => {
	const [{ count }] = await getTotalAuthors.execute();

	const idsAuthor = await getIdAuthor.execute({
		limit: 100,
		offset: faker.number.int(Number(count)),
	});

	const { id_author } = pickRandom(idsAuthor);

	return id_author;
};

export const generateAuthor = async (faker: Faker): Promise<AuthorInsert> => ({
	name_author: faker.person.fullName(),
	country_author: pickRandom(["Cuba", faker.location.country()]),
	description_author: faker.lorem.paragraph(),
});

export const generateAuthorDocument = async (
	faker: Faker
): Promise<AuthorDocumentInsert> => ({
	id_author: await getRandomIdAuthor(faker),
	id_document: await getRandomIdDocument(faker),
});
