import { Faker } from "@faker-js/faker";
import { db } from "../../db";
import { room } from "../room/room";
import { pickRandom } from "../../utils/pick-random";
import { collection_type } from "../enums";
import { Collection } from "./types";

export const generateIdCollection = async (faker: Faker): Promise<string> => {
	// random 3 uppercase letters -> ABC
	const randomId = faker.string.alpha({ length: 3, casing: "upper" });

	// random 4 digits -> 0070
	const randomDigits = faker.number.int({ min: 1111, max: 9999 });

	return `${randomId}-${randomDigits}`;
};

export const getIdRoom = db
	.select({ id_room: room.id_room })
	.from(room)
	.prepare("id_room");

export const generateCollection = async (faker: Faker): Promise<Collection> => {
	const { id_room } = pickRandom(await getIdRoom.execute());

	return {
		id_collection: await generateIdCollection(faker),
		id_room,
		name_collection: `Colección de ${faker.company.name()}`,
		description_collection: faker.lorem.paragraph(),
		type_collection: pickRandom(collection_type.enumValues),
	};
};
