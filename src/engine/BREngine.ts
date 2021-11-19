export interface EventDesc {
	key: number;
	desc: string;
}

export function generateRound(length: number): EventDesc[] {
	let events: EventDesc[] = [];

	for (let i = 1; i < length + 1; i++) {
		events.push(generateEvent(i));
	}
	return events;
}
export function generateEvent(key: number): EventDesc {
	let desc = "this is an event!";

	return { key, desc };
}
