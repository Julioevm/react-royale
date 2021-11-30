import { Player } from "../DAL/Player";
import { EventDesc } from "./Event";
import { getRandomNumber } from "./Utils";

export interface RollThreshold {
	playerRoll: number;
	playerThreshold: number;
}

export function generateFightRoll(
	player1: Player,
	player2: Player
): RollThreshold {
	const hthCombat = player1.weapon.value + player2.weapon.value === 0;
	const playerThreshold = hthCombat
		? getRandomNumber(50)
		: getRandomNumber(player1.weapon.value);
	const playerRoll = getRandomNumber(100) + player1.state.bonus;

	return { playerRoll, playerThreshold };
}
export function generateFightEvent(
	roll: RollThreshold,
	player1: Player,
	player2: Player
): EventDesc {
	let desc;

	if (roll.playerRoll < roll.playerThreshold) {
		desc = `${player1.name} wins!`;
	} else if (roll.playerRoll <= roll.playerThreshold + 10) {
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
