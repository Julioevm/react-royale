import { CSSProperties } from "react";

export interface PlayerState {
    name: string;
    bonus: number;
    style: CSSProperties;
}

export const STATE_HEALTHY: PlayerState = {
    name: "Healthy",
    bonus: 0,
    style: {color: "green"},
}

export interface Player {
    key: string;
    name: string;
    weapon: string;
    state: PlayerState;
}

function initializePlayers(players: Player[]): Player[] {
    return players.map(player => ({
        ...player,
        weapon: "None",
        state: STATE_HEALTHY,
    }));
}

function loadPlayersJSON(playerJSON: string): Player[] {
    return require(playerJSON);
}

export function getPlayers() {
    const players = loadPlayersJSON("../assets/data/roster.json")
    return initializePlayers(players);
}
