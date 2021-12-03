import { Player, STATE_WOUNDED } from "../DAL/Player";
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
	attacker: Player,
	defender: Player
): CombatRoll {
	// The lowest value a weapon should have is 10 for the fists, hence 20 means both players are unarmed.
	const isHthCombat = attacker.weapon.value + defender.weapon.value === 20;
	const playerThreshold = isHthCombat
		? 50
		: attacker.weapon.value;
	// The player state adds (or takes) to the combat roll.
	const playerRoll = getRandomNumber(100) + attacker.state.penalty;

	// When in Hand to Hand combat (HtH) the first kill roll only wounds.
	if (playerRoll < playerThreshold && !isHthCombat) {
		return CombatRoll.Kill;
	} else if (playerRoll <= playerThreshold + 10) {
		// Wounding an already wounded player results in a kill
		return defender.state === STATE_WOUNDED
			? CombatRoll.Kill
			: CombatRoll.Wound;
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
		desc = `${player1.name} kills ${player2.name}!`;
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
