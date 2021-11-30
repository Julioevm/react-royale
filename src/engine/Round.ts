import { getPlayers, Player } from "../DAL/Player";
import { EventDesc, generateRoundEvents } from "./Event";

export interface Round {
	id: number;
	name: string;
	events: EventDesc[];
}

export interface Game {
	players: Player[];
	rounds: Round[];
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
