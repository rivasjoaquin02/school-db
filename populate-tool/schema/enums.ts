import { pgEnum } from "drizzle-orm/pg-core";

export const access_method_type = pgEnum("access_method_type", [
	"member card",
	"provisional pass",
]);
export const format_type = pgEnum("format_type", ["physical", "digital"]);
export const document_type = pgEnum("document_type", [
	"art",
	"manuscript",
	"ethnology",
	"file",
	"map",
	"picture",
	"poster",
	"media",
	"music",
	"reference",
	"magazine",
	"book",
]);
export const service_type = pgEnum("service_type", [
	"loan",
	"heritage preservation",
	"cultural event",
	"consultation in a room",
	"bibliographic references",
]);
export const status_type = pgEnum("status_type", [
	"requested",
	"approved",
	"in-loan",
	"renovated",
	"returned",
	"non-returned",
	"lost",
]);
export const loan_type = pgEnum("loan_type", ["loan_member", "loan_library"]);
export const penalty_type = pgEnum("penalty_type", [
	"late fees",
	"suspension of borrowing privileges",
	"replacement cost",
	"processing fee",
]);
export const category_type = pgEnum("category_type", [
	"researcher",
	"professional",
	"student",
	"foreign",
]);
export const collection_type = pgEnum("collection_type", [
	"special",
	"general",
]);

export const map_type = pgEnum("map_type", [
	"topographic",
	"road",
	"thematic",
	"geologic",
	"political",
	"physical",
]);

export const technique_type = pgEnum("technique_type", [
	"oil",
	"acrylic",
	"watercolor",
	"pastel",
	"encaustic",
	"fresco",
	"gouache",
	"ink wash",
	"spray",
]);

export const pickRandom = <T>(arr: T[]): T => {
	return arr[Math.floor(Math.random() * arr.length)];
};
