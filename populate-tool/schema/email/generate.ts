import { Faker } from "@faker-js/faker";
import { Email, EmailLibrary, EmailRoom } from "./types";
import { db } from "../../db";
import { email } from "./email";
import { pickRandom } from "../../utils/pick-random";
import { getIdLibrary } from "../room/room";
import { getIdRoom } from "../collection/generate";

export const generateEmail = async (faker: Faker): Promise<Email> => {
	return {
		email: faker.internet
			.email({ allowSpecialCharacters: false })
			.toLocaleLowerCase(),
		description_email: faker.lorem.sentence(5),
	};
};

const getEmail = db.select({ email: email.email }).from(email).prepare("email");

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
