import { Faker } from "@faker-js/faker";
import { Collection, collection_type, getIdRoom, getTotalRoom } from ".";
import { pickRandom } from "../../utils/pick-random";

export const generateIdCollection = async (faker: Faker): Promise<string> => {
	const randomId = faker.string.alpha({ length: 3, casing: "upper" });
	const randomDigits = faker.number.int({ min: 1111, max: 9999 });
	return `${randomId}-${randomDigits}`;
};

export const generateCollection = async (faker: Faker): Promise<Collection> => {
	const [{ count: totalRoom }] = await getTotalRoom.execute();

	const { id_room } = pickRandom(
		await getIdRoom.execute({
			limit: 100,
			offset: faker.number.int(Number(totalRoom)),
		})
	);

	return {
		id_collection: await generateIdCollection(faker),
		id_room,
		name_collection: `Colección de ${faker.company.name()}`,
		description_collection: faker.lorem.paragraph(),
		type_collection: pickRandom(collection_type.enumValues),
	};
};
