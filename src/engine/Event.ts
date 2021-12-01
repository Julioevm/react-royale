import { STATE_DEAD } from "./../DAL/Player";
import { Player } from "../DAL/Player";
import { getRandomNumber, rollChance } from "./Utils";
import { CombatRoll, generateFightEvent, generateFightRoll } from "./Combat";

export interface EventDesc {
	id: string;
	desc: string;
}
//TODO: Extract to a config file.
const CombatChance = 60;

function getEngagements(players: Player[]) {
	let engagedPlayers: Player[] = [];
	for (const player of players) {
		if (rollChance(CombatChance)) engagedPlayers.push(player);
	}

	// If the list is odd, skip the last player.
	if (engagedPlayers.length % 2 > 0) engagedPlayers.pop();
	return engagedPlayers;
}

function generateEngagementEvents(players: Player[]): EventDesc[] {
	let events: EventDesc[] = [];

	for (let i = 0; i < players.length; i += 2) {
		const player1 = players[i];
		const player2 = players[i + 1];

		const event: EventDesc = {
			id: `${player1.key}-${player2.key}` + new Date().getTime(),
			desc: `${player1.name} and ${player2.name} are fighting!`,
		};

		events.push(event);

		const combatRoll = generateFightRoll(player1, player2);
		events.push(generateFightEvent(combatRoll, player1, player2));

		if (combatRoll === CombatRoll.Kill) {
			player2.state = STATE_DEAD;
		}
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

export function generateRoundEvents(players: Player[]): EventDesc[] {
	let events: EventDesc[] = [];
	const livePlayers = players.filter((player) => player.state !== STATE_DEAD);
	const engagedPlayers = getEngagements(livePlayers);

	events = generateEngagementEvents(engagedPlayers);

	const unEngagedPlayers = livePlayers.filter(
		(player) =>
			!engagedPlayers.some((engagedPlayer) => player.key === engagedPlayer.key)
	);

	for (const player of unEngagedPlayers) {
		events.push(generateIdleEvent(player));
	}

	return events;
}
