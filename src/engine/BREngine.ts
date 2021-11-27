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

function generateRoundEvents(players: Player[]): EventDesc[] {
	let events: EventDesc[] = [];

	for (let i = 1; i < players.length + 1; i++) {
		events.push(generateEvent(i, players[i - 1]));
	}
	return events;
}

export function generateEvent(id: number, player: Player): EventDesc {
	const roll = getRandomNumber(100);
	let desc;
	if (roll > 70) desc = `${ player.name } has died!`;
	else if (roll > 30) desc = `${ player.name } is moving!`;
	else desc = `${ player.name } is resting...`;

	return { id, desc };
}

export function generateRound(id: number, players: Player[]): Round {
	const events = generateRoundEvents(players);
	return { id, name: `Day ${id}`, events };
}

export function startGame() {
	const players = getPlayers();
	return {
		players: players,
		rounds: [generateRound(1, players)],
	};
}
