import { Player } from "../DAL/Player";
import { getRandomNumber, rollChance } from "./Utils";
import { generateFightEvent, generateFightRoll } from "./Combat";

export interface EventDesc {
	id: string;
	desc: string;
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
			id: `${player1.key}-${player2.key}` + new Date().getTime(),
			desc: `${player1.name} and ${player2.name} are fighting!`,
		};

		events.push(event);

        const combatRoll = generateFightRoll(player1, player2);
		events.push(generateFightEvent(combatRoll, player1, player2));
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

	const engagedPlayers = getEngagements(players);

	events = generateEngagementEvents(engagedPlayers);

	const unEngagedPlayers = players.filter(
		(player) =>
			!engagedPlayers.some((engagedPlayer) => player.key === engagedPlayer.key)
	);

	for (const player of unEngagedPlayers) {
		events.push(generateIdleEvent(player));
	}

	return events;
}
