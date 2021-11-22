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

export interface Player {
	key: string;
	name: string;
	weapon: string;
	state: PlayerState;
}

export function initializePlayers(players: Partial<Player>[]): Player[] {
	return players.map((player) => ({
		...player,
		weapon: "None",
		state: STATE_HEALTHY,
	})) as Player[];
}

function loadPlayersJSON(): Player[] {
	// Theres an issue if I pass the path as parameter.
	return require("../assets/data/roster.json");
}

export function getPlayers() {
	const players = loadPlayersJSON();
	return initializePlayers(players);
}
