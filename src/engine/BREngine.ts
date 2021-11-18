export interface EventDesc {
	key: number;
	desc: string;
}

export function generateEvent(): EventDesc {
	return { key: 1, desc: "this is an event!" };
}
