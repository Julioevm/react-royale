import { Weapon } from "./../DAL/Weapon";
import { STATE_DEAD } from "./../DAL/Player";
import { Player } from "../DAL/Player";
import { getRandomNumber, rollChance } from "./Utils";
import {
	combatRound,
	generateDefenderStatusEvent,
	generateFightEvent,
	generateFightRoll,
} from "./Combat";

export interface EventDesc {
	id: string;
	desc: string;
}

//TODO: Extract to a config file.
enum EngagementChance {
	Low = 20,
	Medium = 45,
	High = 75,
	Extreme = 90,
}

function getEngagementChance(playerCount: number): number {
	if (playerCount < 3) return EngagementChance.Extreme;
	if (playerCount < 6) return EngagementChance.High;
	if (playerCount < 10) return EngagementChance.Medium;
	return EngagementChance.Low;
}

const engagementRoundMod = (round: number) => {
	if (round < 4) return -10;
	if (round > 7) return 10;

	return 0;
};

function getEngagements(players: Player[], roundStage: number) {
	const engagementChance =
		getEngagementChance(players.length) + engagementRoundMod(roundStage);
	const engagedPlayers: Player[] = [];
	for (const player of players) {
		if (rollChance(engagementChance)) engagedPlayers.push(player);
	}

	// If the list is odd, skip the last player.
	if (engagedPlayers.length % 2 > 0) engagedPlayers.pop();
	//? Should we shuffle the list?
	return engagedPlayers;
}

function generateEngagementEvents(players: Player[]): EventDesc[] {
	const events: EventDesc[] = [];

	for (let i = 0; i < players.length; i += 2) {
		const player1 = players[i];
		const player2 = players[i + 1];

		const event: EventDesc = {
			id: `${player1.key}-${player2.key}` + new Date().getTime(),
			desc: `${player1.name} and ${player2.name} are fighting!`,
		};

		events.push(event);

		combatRound(player1, player2, events);

		// If the second player survives, he counter-attacks
		if (player2.state !== STATE_DEAD) {
			combatRound(player2, player1, events);
		}
	}

	return events;
}

function findWeapon(roll: number, weapons: Weapon[]): Weapon | null {
	const weaponFilter = weapons.filter((w) => w.value < roll);
	if (weaponFilter.length === 0) return null;
	return weaponFilter[getRandomNumber(weaponFilter.length)];
}

export function generatePlayerEvent(
	player: Player,
	weapons: Weapon[]
): EventDesc {
	const roll = getRandomNumber(100);
	let desc;
	if (roll > 80) {
		const weapon = findWeapon(getRandomNumber(100), weapons);
		if (weapon) {
			desc = `${player.name} has found a ${weapon.name}!`;
			player.weapon = weapon;
		} else {
			desc = `${player.name} has found nothing useful!`;
		}
	} else if (roll > 30) desc = `${player.name} is moving!`;
	else desc = `${player.name} is resting...`;

	const id = player.key + new Date().getTime();
	return { id, desc };
}

export function generateRoundEvents(
	players: Player[],
	round: number,
	weapons: Weapon[]
): EventDesc[] {
	let events: EventDesc[] = [];
	const livePlayers = players.filter((player) => player.state !== STATE_DEAD);
	const engagedPlayers = getEngagements(livePlayers, round);

	events = generateEngagementEvents(engagedPlayers);

	const unEngagedPlayers = livePlayers.filter(
		(player) =>
			!engagedPlayers.some((engagedPlayer) => player.key === engagedPlayer.key)
	);

	for (const player of unEngagedPlayers) {
		events.push(generatePlayerEvent(player, weapons));
	}

	return events;
}
