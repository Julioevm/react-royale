import { CSSProperties } from "react";
import { Weapon, WEAPON_FISTS } from "./Weapon";

export interface PlayerState {
	name: string;
	penalty: number;
	style: CSSProperties;
}

export const STATE_HEALTHY: PlayerState = {
	name: "Healthy",
	penalty: 0,
	style: { color: "green" },
};

export const STATE_WOUNDED: PlayerState = {
	name: "Wounded",
	penalty: 15,
	style: { color: "yellow" },
};

export const STATE_DEAD: PlayerState = {
	name: "Dead",
	penalty: 0,
	style: { color: "red" },
};

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
