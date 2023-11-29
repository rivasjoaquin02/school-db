import { Faker } from "@faker-js/faker";
import { pickRandom } from "../../utils/pick-random";
import {
	PhoneInsert,
	PhoneLibraryInsert,
	PhoneRoomInsert,
	PhoneSelect,
	getPhoneNumbers,
	getTotalPhone,
} from ".";
import { getRandomIdRoom } from "../room/generate";
import { getRandomIdLibrary } from "../library";

export const getRandomPhoneNumber = async (
	faker: Faker
): Promise<PhoneSelect["phone_number"]> => {
	const [{ count }] = await getTotalPhone.execute();

	const phoneNumbers = await getPhoneNumbers.execute({
		limit: 100,
		offset: faker.number.int(Number(count)),
	});

	const { phone_number } = pickRandom(phoneNumbers);

	return phone_number;
};

const generatePhoneNumber = async (faker: Faker): Promise<string> => {
	const phone_number = `(${faker.number.int(999)}) ${faker.number.int({
		min: 1111,
		max: 9999,
	})}-${faker.number.int({ min: 1111, max: 9999 })}`;
	return phone_number;
};

export const generatePhone = async (faker: Faker): Promise<PhoneInsert> => ({
	phone_number: await generatePhoneNumber(faker),
	description_phone: faker.lorem.sentence(5),
});

export const generatePhoneLibrary = async (
	faker: Faker
): Promise<PhoneLibraryInsert> => ({
	phone_number: await getRandomPhoneNumber(faker),
	id_library: await getRandomIdLibrary(faker),
});

export const generatePhoneRoom = async (
	faker: Faker
): Promise<PhoneRoomInsert> => ({
	phone_number: await getRandomPhoneNumber(faker),
	id_room: await getRandomIdRoom(faker),
});
