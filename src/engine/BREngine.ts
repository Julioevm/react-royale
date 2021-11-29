import { getPlayers, Player } from "../DAL/Player";
import { getRandomNumber, rollChance } from "./Utils";

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

function getEngagements(players: Player[]) {
	let engagedPlayers: Player[] = [];
	for (const player of players) {
		if (rollChance(30)) engagedPlayers.push(player);
	}

	if (engagedPlayers.length % 2 > 0) engagedPlayers.pop();
	return engagedPlayers;
}

function generateEngagementEvents(players: Player[]): EventDesc[] {
	let events: EventDesc[] = [];

	for (let i = 0; i < players.length; i += 2) {
		const player1 = players[i];
		const player2 = players[i + 1];

		const event: EventDesc = {
			id: `${player1.key}-${player2.key}`,
			desc: `${player1.name} and ${player2.name} are fighting!`,
		};

		events.push(event);
	}

	return events;
}

function generateRoundEvents(players: Player[]): EventDesc[] {
	let events: EventDesc[] = [];

	const engagedPlayers = getEngagements(players);

	events = generateEngagementEvents(engagedPlayers);

	const unEngagedPlayers = players.filter(
		(player) => !engagedPlayers.some((engagedPlayer) => player.key === engagedPlayer.key)
	);

	for (const player of unEngagedPlayers) {
		events.push(generateIdleEvent(player));
	}

	return events;
}

export function generateIdleEvent(player: Player): EventDesc {
	const roll = getRandomNumber(100);
	let desc;
	if (roll > 70) desc = `${player.name} is looking for a weapon...`;
	else if (roll > 30) desc = `${player.name} is moving!`;
	else desc = `${player.name} is resting...`;

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
