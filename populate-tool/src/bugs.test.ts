import { faker } from "@faker-js/faker";
import { db } from "./db";
import {
	generatePhoneLibrary,
	phone_library,
	generatePhone,
	phone,
} from "./schema/phone";
import { test } from "bun:test";

// test("test", async () => {
// 	const value2 = await generateDocumentCollection(faker);

// 	console.log(value2);
// });

// test("test", async () => {
// 	const value3 = await generatePhoneLibrary(faker);

// 	console.log(value3);
// });

// test("test", async () => {
// 	const value4 = await generateLoanResearcher(faker);

// 	console.log(value4);
// });

test("test", async () => {
	const value = await generatePhoneLibrary(faker);

	// if (!value.id_library || !value.phone_number) console.log(value);

	// expect(value.id_library).toBeDefined();
	// expect(value.phone_number).toBeDefined();

	await db.insert(phone_library).values(value);
});

test("test1", async () => {
	const value2 = await generatePhone(faker);

	// if (!value.id_library || !value.phone_number) console.log(value);

	// expect(value.id_library).toBeDefined();
	// expect(value.phone_number).toBeDefined();

	// console.log(value2);

	await db.insert(phone).values(value2);
});
