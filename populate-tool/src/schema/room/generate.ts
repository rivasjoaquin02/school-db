import { Faker } from "@faker-js/faker";
import { getTotalRoom, getIdsRoom } from ".";
import { pickRandom } from "../../utils/pick-random";
import { getRandomIdLibrary } from "../library";
import { access_method_type } from "./schema";
import { RoomSelect, RoomInsert } from "./types";

export const getRandomIdRoom = async (
	faker: Faker
): Promise<RoomSelect["id_room"]> => {
	const [{ count }] = await getTotalRoom.execute();

	const idsRoom = await getIdsRoom.execute({
		limit: 100,
		offset: faker.number.int(Number(count)),
	});

	const { id_room } = pickRandom(idsRoom);

	return id_room;
};

export const generateIdRoom = async (faker: Faker): Promise<string> => {
	const randomId = faker.string.alpha({ length: 3, casing: "upper" });
	const randomYear = faker.date
		.between({ from: 2000, to: 2022 })
		.getFullYear();
	const randomDigits = faker.number.int({ min: 1111, max: 9999 });
	const randomLetter = faker.string.alpha({ length: 1, casing: "upper" });

	const fullId = `${randomId} ${randomYear}-${randomDigits}-${randomLetter}`;

	return fullId;
};

export const generateRoom = async (faker: Faker): Promise<RoomInsert> => ({
	id_room: await generateIdRoom(faker),
	id_library: await getRandomIdLibrary(faker),
	name_room: faker.helpers.fake(`Sala {{company.name()}}`),
	location_room: faker.location.streetAddress(true),
	description_room: faker.lorem.paragraph(),
	access_method: pickRandom(access_method_type.enumValues),
	phone_extension: faker.number.int({ min: 100, max: 999 }),
});
