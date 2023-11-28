import { Faker } from "@faker-js/faker";
import { Author, AuthorDocument, getIdAuthor, getTotalAuthors } from ".";
import { pickRandom } from "../../utils/pick-random";
import { getIdDocument, getTotalDocuments } from "../document";

export const generateAuthor = async (faker: Faker): Promise<Author> => {
	return {
		name_author: faker.person.fullName(),
		country_author: pickRandom(["Cuba", faker.location.country()]),
		description_author: faker.lorem.paragraph(),
	};
};

export const generateAuthorDocument = async (
	faker: Faker
): Promise<AuthorDocument> => {
	const [{ count: totalAuthors }] = await getTotalAuthors.execute();
	const [{ count: totalDocuments }] = await getTotalDocuments.execute();

	const { id_author } = pickRandom(
		await getIdAuthor.execute({
			limit: 100,
			offset: faker.number.int(Number(totalAuthors)),
		})
	);
	const { id_document } = pickRandom(
		await getIdDocument.execute({
			limit: 100,
			offset: faker.number.int(Number(totalDocuments)),
		})
	);

	return {
		id_author,
		id_document,
	};
};
