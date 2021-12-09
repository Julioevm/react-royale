import { getPlayers, Player } from "../DAL/Player";
import { Weapon, getWeapons } from "../DAL/Weapon";
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
export interface Game {
	players: Player[];
	rounds: Round[];
	weapons: Weapon[];
}

export const EMPTY_GAME: Game = {
	players: [],
	rounds: [],
	weapons: [],
};

export function generateRound(game: Game): GameRound {
	const roundNumber = game.rounds.length + 1;
	const events = generateRoundEvents(game.players, roundNumber, game.weapons);
	const round = { id: roundNumber, name: `Day ${roundNumber}`, events };
	return { players: game.players, round };
}

export function startGame(): Game {
	const NewGame: Game = {
		players: getPlayers(),
		rounds: [],
		weapons: getWeapons(),
	};

	const GameRound = generateRound(NewGame);
	NewGame.rounds.push(GameRound.round);
	return NewGame;
}
