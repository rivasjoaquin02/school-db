import { Faker } from "@faker-js/faker";
import {
	cubaProvinces,
	profesorDepartment,
	categories,
	languages,
} from "../constants";
import {
	EstudianteInsert,
	ProfesorInsert,
	LibroInsert,
	PrestamoInsert,
	PerdidaInsert,
	AutorInsert,
	AutorLibroInsert,
	PersonaInsert,
} from "../schema/types";
import {
	getRandomSolapin,
	getRandomIdBook,
	getRandomNumeroPrestamo,
	getRandomIdAuthor,
} from "../utils/get-ids";
import { pickRandom } from "../utils/pick-random";

const generateSolapin = (faker: Faker): string => {
	return faker.helpers.fake(
		`${pickRandom(["E", "P"])}${faker.number.int({
			min: 100000,
			max: 999999,
		})}`
	);
};

const generateApartment = (faker: Faker): number => {
	const edfNumber = faker.number.int({ min: 10, max: 100 });
	const floorNumber = faker.number.int({ min: 100, max: 106 });
	return edfNumber * 100 + floorNumber;
};

const generateGroup = (faker: Faker): number => {
	const year = faker.number.int({ min: 1, max: 5 });
	const grupo = faker.number.int({ min: 1, max: 5 });
	return 4 * 1000 + year * 100 + 10 + grupo;
};

export const generatePersona = async (
	faker: Faker
): Promise<PersonaInsert> => ({
	solapin: generateSolapin(faker),
	provincia: pickRandom(cubaProvinces),
	apartamento: generateApartment(faker),
	nombre: faker.person.fullName(),
	correo: faker.internet.email(),
	numeroTel: faker.number.int({ min: 52000000, max: 58000000 }),
});

export const generateEstudiante = async (
	faker: Faker
): Promise<EstudianteInsert> => ({
	solapin: await getRandomSolapin(),
	ano: faker.number.int({ min: 1, max: 5 }),
	grupo: generateGroup(faker),
});

export const generateProfesor = async (): Promise<ProfesorInsert> => ({
	solapin: await getRandomSolapin(),
	departamento: pickRandom(profesorDepartment),
});

export const generateLibro = async (faker: Faker): Promise<LibroInsert> => ({
	codigo: faker.commerce.isbn(),
	anoPublicacion: `${faker.date.between({
		from: "1980-01-01",
		to: "2023-01-01",
	})}`,
	categoria: pickRandom(categories),
	editorial: faker.company.name(),
	idioma: pickRandom(languages),
	precio: faker.commerce.price(),
	titulo: faker.lorem.word(),
});

export const generatePrestamo = async (
	faker: Faker
): Promise<PrestamoInsert> => ({
	solapin: await getRandomSolapin(),
	codigo: await getRandomIdBook(),
	fechaEntrega: `${faker.date.past({ years: 3 })}`,
	fechaRecogida: `${faker.date.future({ years: 3 })}`,
});

export const generatePerdida = async (
	faker: Faker
): Promise<PerdidaInsert> => ({
	fechaReporte: `${faker.date.recent()}`,
	numeroPrestamo: await getRandomNumeroPrestamo(),
});

export const generateAutor = async (faker: Faker): Promise<AutorInsert> => ({
	nombre: faker.person.fullName(),
	paisAutor: faker.location.country(),
	sexo: faker.person.gender(),
});

export const generateAutorLibro = async (): Promise<AutorLibroInsert> => ({
	codigo: await getRandomIdBook(),
	idAutor: await getRandomIdAuthor(),
});
