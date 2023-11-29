import { Faker } from "@faker-js/faker";
import { pickRandom } from "../../utils/pick-random";
import { getRandomIdCollection } from "../collection/generate";
import { getTotalDocuments, getIdsDocument } from "./querys";
import { format_type, document_type, map_type, technique_type } from "./schema";
import {
	DocumentSelect,
	DocumentInsert,
	DocumentCollectionInsert,
	ManuscriptInsert,
	MapInsert,
	PictureInsert,
	PaintInsert,
	MediaInsert,
	MusicInsert,
	ReferenceInsert,
	MagazineInsert,
	BookInsert,
} from "./types";

export const getRandomIdDocument = async (
	faker: Faker
): Promise<DocumentSelect["id_document"]> => {
	const [{ count }] = await getTotalDocuments.execute();

	const idsDocument = await getIdsDocument.execute({
		limit: 100,
		offset: faker.number.int(Number(count)),
	});

	const { id_document } = pickRandom(idsDocument);

	return id_document;
};

export const generateDocument = async (
	faker: Faker
): Promise<DocumentInsert> => ({
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
});

export const generateDocumentCollection = async (
	faker: Faker
): Promise<DocumentCollectionInsert> => ({
	id_document: await getRandomIdDocument(faker),
	id_collection: await getRandomIdCollection(faker),
});

export const generateManuscript = async (
	faker: Faker
): Promise<ManuscriptInsert> => ({
	id_document: await getRandomIdDocument(faker),
	period: faker.lorem.sentence(10),
});

export const generateMap = async (faker: Faker): Promise<MapInsert> => ({
	id_document: await getRandomIdDocument(faker),
	dimension_height: faker.number.int(10000),
	dimension_width: faker.number.int(10000),
	scale: `${faker.number.int(1000)}:${faker.number.int(1000)}`,
	type_map: pickRandom(map_type.enumValues),
});

export const generatePicture = async (
	faker: Faker
): Promise<PictureInsert> => ({
	id_document: await getRandomIdDocument(faker),
	dimension_height: faker.number.int(10000),
	dimension_width: faker.number.int(10000),
});

export const generatePaint = async (faker: Faker): Promise<PaintInsert> => ({
	id_document: await getRandomIdDocument(faker),
	technique: pickRandom(technique_type.enumValues),
	dimension_height: faker.number.int(10000),
	dimension_width: faker.number.int(10000),
});
export const generateMedia = async (faker: Faker): Promise<MediaInsert> => ({
	id_document: await getRandomIdDocument(faker),
	genre: faker.lorem.sentence(10),
	director: faker.person.fullName(),
	producer: faker.person.fullName(),
	duration: faker.number.int(10000),
});
export const generateMusic = async (faker: Faker): Promise<MusicInsert> => ({
	id_document: await getRandomIdDocument(faker),
	genre: faker.music.genre(),
	performer: faker.person.fullName(),
	composer: faker.person.fullName(),
	duration: faker.number.int(10000),
});
export const generateReference = async (
	faker: Faker
): Promise<ReferenceInsert> => ({
	id_document: await getRandomIdDocument(faker),
	serial: faker.number.int(10000),
});
export const generateMagazine = async (
	faker: Faker
): Promise<MagazineInsert> => ({
	id_document: await getRandomIdDocument(faker),
	editor: faker.person.fullName(),
	issn: `${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({
		min: 1000,
		max: 9999,
	})}`,
});

export const generateIsbn = async (faker: Faker): Promise<string> => {
	const prefix = faker.number.int(1000);
	const registrant = faker.number.int(1000);
	const publication = faker.number.int(1000);
	const control = faker.number.int(10);

	return `${prefix}-${registrant}-${publication}-${control}`;
};

export const generateIssn = async (faker: Faker): Promise<string> => {
	const prefix = faker.number.int({ min: 1000, max: 9999 });
	const suffix = faker.number.int({
		min: 1000,
		max: 9999,
	});

	return `${prefix}-${suffix}`;
};

export const generateBook = async (faker: Faker): Promise<BookInsert> => ({
	id_document: await getRandomIdDocument(faker),
	genre: faker.lorem.word(10),
	issn: await generateIssn(faker),
	isbn: await generateIsbn(faker),
	dewey: faker.number.float({
		min: 100,
		max: 999,
		precision: 3,
	}),
});
