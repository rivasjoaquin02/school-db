import {
	document_type,
	format_type,
	map_type,
	technique_type,
} from "../enums.ts";
import { Faker } from "@faker-js/faker";
import { collection } from "../collection/collection.ts";
import { db } from "../../db.ts";
import { pickRandom } from "../../utils/pick-random.ts";
import {
	Book,
	Document,
	DocumentCollection,
	Magazine,
	Manuscript,
	Map,
	Media,
	Music,
	Paint,
	Picture,
	Reference,
} from "./types.ts";
import { document } from "./document.ts";

export const generateDocument = async (faker: Faker): Promise<Document> => {
	return {
		title: faker.lorem.sentence(10),
		created_at: faker.date.past().toString(),
		editorial: faker.company.name(),
		publication_place: faker.location.city(),
		language: pickRandom(["es", "en", "fr", "de", "it", "ru"]),
		format: pickRandom(format_type.enumValues),
		subject: faker.lorem.sentence(10),
		summary: faker.lorem.paragraph(10),
		is_patrimony: faker.datatype.boolean(),
		note: faker.lorem.paragraph(10),
		type_document: pickRandom(document_type.enumValues),
	};
};

export const getIdCollection = db
	.select({ id_collection: collection.id_collection })
	.from(collection)
	.prepare("id_collection");

export const getIdDocument = db
	.select({ id_document: document.id_document })
	.from(document)
	.prepare("id_document");

export const generateDocumentCollection =
	async (): Promise<DocumentCollection> => {
		const { id_document } = pickRandom(await getIdDocument.execute());
		const { id_collection } = pickRandom(await getIdCollection.execute());

		return {
			id_document,
			id_collection,
		};
	};

export const generateManuscript = async (faker: Faker): Promise<Manuscript> => {
	const { id_document } = pickRandom(await getIdDocument.execute());

	return {
		id_document,
		period: faker.lorem.sentence(10),
	};
};

export const generateMap = async (faker: Faker): Promise<Map> => {
	const { id_document } = pickRandom(await getIdDocument.execute());

	return {
		id_document,
		dimension_height: faker.number.int(10000),
		dimension_width: faker.number.int(10000),
		scale: `${faker.number.int(1000)}:${faker.number.int(1000)}`,
		type_map: pickRandom(map_type.enumValues),
	};
};
export const generatePicture = async (faker: Faker): Promise<Picture> => {
	const { id_document } = pickRandom(await getIdDocument.execute());

	return {
		id_document,
		dimension_height: faker.number.int(10000),
		dimension_width: faker.number.int(10000),
	};
};

export const generatePaint = async (faker: Faker): Promise<Paint> => {
	const { id_document } = pickRandom(await getIdDocument.execute());

	return {
		id_document,
		technique: pickRandom(technique_type.enumValues),
		dimension_height: faker.number.int(10000),
		dimension_width: faker.number.int(10000),
	};
};
export const generateMedia = async (faker: Faker): Promise<Media> => {
	const { id_document } = pickRandom(await getIdDocument.execute());

	return {
		id_document,
		genre: faker.lorem.sentence(10),
		director: faker.person.fullName(),
		producer: faker.person.fullName(),
		duration: faker.number.int(10000),
	};
};
export const generateMusic = async (faker: Faker): Promise<Music> => {
	const { id_document } = pickRandom(await getIdDocument.execute());

	return {
		id_document,
		genre: faker.lorem.sentence(10),
		performer: faker.person.fullName(),
		composer: faker.person.fullName(),
		duration: faker.number.int(10000),
	};
};
export const generateReference = async (faker: Faker): Promise<Reference> => {
	const { id_document } = pickRandom(await getIdDocument.execute());

	return {
		id_document,
		serial: faker.number.int(10000),
	};
};
export const generateMagazine = async (faker: Faker): Promise<Magazine> => {
	const { id_document } = pickRandom(await getIdDocument.execute());

	return {
		id_document,
		editor: faker.person.fullName(),
		issn: `${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int(
			{ min: 1000, max: 9999 }
		)}`,
	};
};

const generateIsbn = async (faker: Faker): Promise<string> => {
	const prefix = faker.number.int(1000);
	const registrant = faker.number.int(1000);
	const publication = faker.number.int(1000);
	const control = faker.number.int(10);

	return `${prefix}-${registrant}-${publication}-${control}`;
};

export const generateBook = async (faker: Faker): Promise<Book> => {
	const { id_document } = pickRandom(await getIdDocument.execute());

	return {
		id_document,
		genre: faker.lorem.sentence(10),
		issn: `${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int(
			{ min: 1000, max: 9999 }
		)}`,
		isbn: await generateIsbn(faker),
		dewey: faker.number.int(10000),
	};
};
