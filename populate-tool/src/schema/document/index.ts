export {
	document,
	book,
	document_collection,
	document_type,
	format_type,
	magazine,
	manuscript,
	map,
	map_type,
	media,
	music,
	paint,
	picture,
	reference,
	technique_type,
} from "./document.ts";

export {
	type Book,
	type Document,
	type DocumentCollection,
	type Magazine,
	type Manuscript,
	type Map,
	type Media,
	type Music,
	type Paint,
	type Picture,
	type Reference,
} from "./types.ts";

export {
	generateBook,
	generateDocument,
	generateDocumentCollection,
	generateMagazine,
	generateManuscript,
	generateMap,
	generateMedia,
	generateMusic,
	generatePaint,
	generatePicture,
	generateReference,
} from "./generate.ts";

export { getIdCollection, getIdDocument, getTotalDocuments } from "./querys.ts";
