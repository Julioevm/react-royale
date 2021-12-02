import { CSSProperties } from "react";

export interface PlayerState {
	name: string;
	bonus: number;
	style: CSSProperties;
}

export const STATE_HEALTHY: PlayerState = {
	name: "Healthy",
	bonus: 0,
	style: { color: "green" },
};

export const STATE_DEAD: PlayerState = {
	name: "Dead",
	bonus: 0,
	style: { color: "red" },
};

export const WEAPON_FISTS: Weapon = {
	key: "fists",
	name: "Fists",
	value: 0,
	types: ["hth"],
};

export interface Weapon {
	key: string;
	name: string;
	value: number;
	types: string[];
}

export interface Player {
	key: string;
	name: string;
	weapon: Weapon;
	state: PlayerState;
	image?: string;
}

export function initializePlayers(players: Partial<Player>[]): Player[] {
	return players.map((player) => ({
		...player,
		weapon: WEAPON_FISTS,
		state: STATE_HEALTHY,
	})) as Player[];
}

function loadPlayersJSON(): Player[] {
	// Theres an issue if I pass the path as parameter.
	return require("../assets/data/roster.json");
}

export function getPlayers(): Player[] {
	const players = loadPlayersJSON();
	return initializePlayers(players);
}
