import { Player } from "../DAL/Player";
import { EventDesc } from "./Event";
import { getRandomNumber } from "./Utils";

export interface RollThreshold {
	playerRoll: number;
	playerThreshold: number;
}

export enum CombatRoll {
	Kill,
	Wound,
	Miss,
}

export function generateFightRoll(
	player1: Player,
	player2: Player
): CombatRoll {
	const hthCombat = player1.weapon.value + player2.weapon.value === 0;
	const playerThreshold = hthCombat
		? getRandomNumber(50)
		: getRandomNumber(player1.weapon.value);
	const playerRoll = getRandomNumber(100) + player1.state.bonus;

	if (playerRoll < playerThreshold) {
		return CombatRoll.Kill;
	} else if (playerRoll <= playerThreshold + 10) {
		return CombatRoll.Wound;
	} else {
		return CombatRoll.Miss;
	}
}

export function generateFightEvent(
	roll: CombatRoll,
	player1: Player,
	player2: Player
): EventDesc {
	let desc;

	if (roll === CombatRoll.Kill) {
		desc = `${player1.name} wins!`;
	} else if (roll === CombatRoll.Wound) {
		desc = `${player1.name} wounds ${player2.name}!`;
	} else {
		desc = `${player1.name} misses ${player2.name}!`;
	}

	const event: EventDesc = {
		id:
			`${player1.key}-${player1.weapon.key}-${player2.key}` +
			new Date().getTime(),
		desc: desc,
	};

	return event;
}