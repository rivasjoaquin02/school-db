import { Faker } from "@faker-js/faker";
import { Phone, PhoneLibrary, PhoneRoom } from "./types";
import { pickRandom } from "../../utils/pick-random";
import { generateIdRoom } from "../room/room";
import { phone } from "./phone";
import { db } from "../../db";

const generatePhoneNumber = async (faker: Faker): Promise<string> => {
	const phone_number = `(${faker.number.int(999)}) ${faker.number.int({
		min: 1111,
		max: 9999,
	})}-${faker.number.int({ min: 1111, max: 9999 })}`;
	return phone_number;
};

export const generatePhone = async (faker: Faker): Promise<Phone> => ({
	phone_number: await generatePhoneNumber(faker),
	description_phone: faker.lorem.sentence(5),
});

export const generatePhoneLibrary = async (
	faker: Faker
): Promise<PhoneLibrary> => {
	const { phone_number } = pickRandom(await getPhoneNumber.execute());

	return {
		phone_number,
		id_library: faker.number.int(10000),
	};
};

export const generatePhoneRoom = async (faker: Faker): Promise<PhoneRoom> => {
	const { phone_number } = pickRandom(await getPhoneNumber.execute());

	return {
		phone_number,
		id_room: await generateIdRoom(faker),
	};
};

const getPhoneNumber = db
	.select({ phone_number: phone.phone_number })
	.from(phone)
	.prepare("phone_number");
