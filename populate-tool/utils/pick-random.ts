export const pickRandom = <T>(arr: T[]): T => {
	if (arr.length === 0) return [] as any;

	return arr[Math.floor(Math.random() * arr.length)];
};
