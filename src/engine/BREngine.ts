import { getPlayers, Player } from "../DAL/Player";
import { getRandomNumber } from "./Utils";

export interface EventDesc {
	id: number;
	desc: string;
}

export interface Round {
	id: number;
	name: string;
	events: EventDesc[];
}

export interface Game {
	players: Player[];
	rounds: Round[];
}

function generateRoundEvents(length: number): EventDesc[] {
	let events: EventDesc[] = [];

	for (let i = 1; i < length + 1; i++) {
		events.push(generateEvent(i));
	}
	return events;
}

export function generateEvent(id: number): EventDesc {
	const roll = getRandomNumber(100);
	let desc;
	if (roll > 70) desc = "A player has died!";
	else if (roll > 30) desc = "A player is moving!";
	else desc = "A player is resting...";

	return { id, desc };
}

export function generateRound(id: number): Round {
	const events = generateRoundEvents(5);
	return { id, name: `Day ${id}`, events };
}

export function startGame() {
	return {
		players: getPlayers(),
		rounds: [generateRound(1)],
	};
}
