export interface EventDesc {
	id: number;
	desc: string;
}

export interface Round {
	id: number;
	name: string;
	events: EventDesc[];
}

export function generateRoundEvents(length: number): EventDesc[] {
	let events: EventDesc[] = [];

	for (let i = 1; i < length + 1; i++) {
		events.push(generateEvent(i));
	}
	return events;
}
export function generateEvent(id: number): EventDesc {
	let desc = "this is an event!";

	return { id, desc };
}
