import { Faker } from "@faker-js/faker";
import { CollectionInsert, CollectionSelect, collection_type } from ".";
import { pickRandom } from "../../utils/pick-random";
import { getRandomIdRoom } from "../room/generate";
import { getIdsCollection, getTotalCollections } from "./querys";

export const getRandomIdCollection = async (
	faker: Faker
): Promise<CollectionSelect["id_collection"]> => {
	const [{ count }] = await getTotalCollections.execute();

	const idsCollection = await getIdsCollection.execute({
		limit: 100,
		offset: faker.number.int(Number(count)),
	});

	const { id_collection } = pickRandom(idsCollection);

	return id_collection;
};

export const generateIdCollection = async (
	faker: Faker
): Promise<CollectionSelect["id_collection"]> => {
	const randomId = faker.string.alpha({ length: 3, casing: "upper" });
	const randomDigits = faker.number.int({ min: 1111, max: 9999 });
	return `${randomId}-${randomDigits}`;
};

export const generateCollection = async (
	faker: Faker
): Promise<CollectionInsert> => {
	return {
		id_collection: await generateIdCollection(faker),
		id_room: await getRandomIdRoom(faker),
		name_collection: `Colección de ${faker.company.name()}`,
		description_collection: faker.lorem.paragraph(),
		type_collection: pickRandom(collection_type.enumValues),
	};
};
