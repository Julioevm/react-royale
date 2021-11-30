import { Player } from "../DAL/Player";
import { EventDesc } from "./Event";
import { getRandomNumber } from "./Utils";


export function generateFightEvent(player1: Player, player2: Player): EventDesc {
	const hthCombat = player1.weapon.value + player2.weapon.value === 0;
	const player1Threshold = hthCombat
		? getRandomNumber(50)
		: getRandomNumber(player1.weapon.value);
	const player1Roll = getRandomNumber(100) + player1.state.bonus;
	let desc;

	if (player1Roll < player1Threshold) {
		desc = `${player1.name} wins!`;
	} else if (player1Roll <= player1Threshold + 10) {
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