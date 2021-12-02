import { getPlayers, Player } from "../DAL/Player";
import { EventDesc, generateRoundEvents } from "./Event";

export interface Round {
	id: number;
	name: string;
	events: EventDesc[];
}

export interface GameRound {
	players: Player[];
	round: Round;
}

export function generateRound(id: number, players: Player[]): GameRound {
	const events = generateRoundEvents(players, id);
	const round = { id, name: `Day ${id}`, events };
	return {players, round}
}

export function startGame() {
	const players = getPlayers();
	return {
		players: players,
		rounds: [generateRound(1, players)],
	};
}
