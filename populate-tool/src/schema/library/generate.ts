import { Faker } from "@faker-js/faker";
import {
	LibraryInsert,
	LibrarySelect,
	getIdsLibrary,
	getTotalLibrary,
} from ".";
import { pickRandom } from "../../utils/pick-random";

export const getRandomIdLibrary = async (
	faker: Faker
): Promise<LibrarySelect["id_library"]> => {
	const [{ count }] = await getTotalLibrary.execute();

	const idsLibrary = await getIdsLibrary.execute({
		limit: 100,
		offset: faker.number.int(Number(count)),
	});

	const { id_library } = pickRandom(idsLibrary);

	return id_library;
};

export const generateLibrary = async (
	faker: Faker
): Promise<LibraryInsert> => ({
	name_library: faker.helpers.fake(`Biblioteca {{person.fullName()}}`),
	location_library: faker.location.streetAddress(true),
	description_library: faker.lorem.paragraph(),
	website: faker.internet.url(),
});
