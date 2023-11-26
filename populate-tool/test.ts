import { Faker, Randomizer, SimpleFaker, en, es } from "@faker-js/faker";
import { RandomGenerator, xoroshiro128plus } from "pure-rand";

export function generatePureRandRandomizer(
	seed: number | number[] = Date.now() ^ (Math.random() * 0x100000000),
	factory: (seed: number) => RandomGenerator = xoroshiro128plus
): Randomizer {
	const self = {
		next: () => (self.generator.unsafeNext() >>> 0) / 0x100000000,
		seed: (seed: number | number[]) => {
			self.generator = factory(typeof seed === "number" ? seed : seed[0]);
		},
	} as Randomizer & { generator: RandomGenerator };
	self.seed(seed);
	return self;
}

export const customFaker = new Faker({
	locale: [es, en],
	randomizer: generatePureRandRandomizer(),
});
