import { Faker } from "@faker-js/faker";
import { Email, EmailCollection, EmailLibrary, EmailRoom, getEmail } from ".";
import { pickRandom } from "../../utils/pick-random";
import { getIdRoom } from "../collection";
import { getIdCollection } from "../document";
import { getIdLibrary } from "../library";

export const generateEmail = async (faker: Faker): Promise<Email> => {
	return {
		email: faker.internet
			.email({ allowSpecialCharacters: false })
			.toLocaleLowerCase(),
		description_email: faker.lorem.sentence(5),
	};
};

export const generateEmailLibrary = async (): Promise<EmailLibrary> => {
	const { email } = pickRandom(await getEmail.execute());
	const { id_library } = pickRandom(await getIdLibrary.execute());

	return {
		email,
		id_library,
	};
};

export const generateEmailRoom = async (): Promise<EmailRoom> => {
	const { email } = pickRandom(await getEmail.execute());
	const { id_room } = pickRandom(await getIdRoom.execute());

	return {
		email,
		id_room,
	};
};

export const generateEmailCollection = async (): Promise<EmailCollection> => {
	const { email } = pickRandom(await getEmail.execute());
	const { id_collection } = pickRandom(await getIdCollection.execute());

	return {
		email,
		id_collection,
	};
};
