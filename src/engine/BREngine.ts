import { getPlayers, Player } from "../DAL/Player";
import { getRandomNumber } from "./Utils";

export interface EventDesc {
	id: string;
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

	for (const player of players) {

		events.push(generateEvent(player));
	}
	
	return events;
}

export function generateEvent( player: Player): EventDesc {
	const roll = getRandomNumber(100);
	let desc;
	if (roll > 70) desc = `${ player.name } has died!`;
	else if (roll > 30) desc = `${ player.name } is moving!`;
	else desc = `${ player.name } is resting...`;

	const id = player.key + new Date().getTime();
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
