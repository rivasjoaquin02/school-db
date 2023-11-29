import { Faker } from "@faker-js/faker";
import { pickRandom } from "../../utils/pick-random";
import { getRandomIdCollection } from "../collection/generate";
import { getRandomIdRoom } from "../room/generate";
import {
	EmailCollectionInsert,
	EmailInsert,
	EmailLibraryInsert,
	EmailRoomInsert,
	EmailSelect,
	getEmails,
	getTotalEmails,
} from ".";
import { getRandomIdLibrary } from "../library";

export const getRandomEmail = async (
	faker: Faker
): Promise<EmailSelect["email"]> => {
	const [{ count }] = await getTotalEmails.execute();

	const emails = await getEmails.execute({
		limit: 100,
		offset: faker.number.int(Number(count)),
	});

	const { email } = pickRandom(emails);

	return email;
};

export const generateEmail = async (faker: Faker): Promise<EmailInsert> => ({
	email: faker.internet
		.email({ allowSpecialCharacters: false })
		.toLocaleLowerCase(),
	description_email: faker.lorem.sentence(5),
});

export const generateEmailLibrary = async (
	faker: Faker
): Promise<EmailLibraryInsert> => ({
	email: await getRandomEmail(faker),
	id_library: await getRandomIdLibrary(faker),
});

export const generateEmailRoom = async (
	faker: Faker
): Promise<EmailRoomInsert> => ({
	email: await getRandomEmail(faker),
	id_room: await getRandomIdRoom(faker),
});

export const generateEmailCollection = async (
	faker: Faker
): Promise<EmailCollectionInsert> => ({
	email: await getRandomEmail(faker),
	id_collection: await getRandomIdCollection(faker),
});
