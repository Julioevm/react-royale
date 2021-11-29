export function getRandomNumber(max: number): number {
	return Math.floor(Math.random() * max);
}

export function rollChance(threshold: number, limit = 100) {
	return threshold > getRandomNumber(limit);
}
