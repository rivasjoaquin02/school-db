import { faker } from "@faker-js/faker";
import { getIdsLoan } from "./schema/service";

const s = await getIdsLoan.execute({
	limit: 100,
	offset: faker.number.int(4),
});
