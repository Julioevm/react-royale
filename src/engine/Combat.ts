import { Player, STATE_DEAD, STATE_WOUNDED } from "../DAL/Player";
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
	const isHtHCombat: boolean =
		(attacker.weapon.isHtH && defender.weapon.isHtH) || false;
	const playerThreshold: number = isHtHCombat ? 50 : attacker.weapon.value;

	// The player state adds (or takes) to the combat roll.
	const playerRoll: number = getRandomNumber(100) + attacker.state.penalty;

	// When in Hand to Hand combat (HtH) the first kill roll only wounds.
	if (playerRoll < playerThreshold && !isHtHCombat) {
		return CombatRoll.Kill;
	} else if (playerRoll <= +playerThreshold + +10) {
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
		desc = `${player1.name} kills ${player2.name} with ${player1.weapon.name}!`;
	} else if (roll === CombatRoll.Wound) {
		desc = `${player1.name} wounds ${player2.name} with ${player1.weapon.name}!`;
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

export function generateDefenderStatusEvent(
	combatRoll: CombatRoll,
	defender: Player
): EventDesc | undefined {
	let event;

	if (combatRoll === CombatRoll.Kill) {
		defender.state = STATE_DEAD;

		const deathEvent: EventDesc = {
			id: `${defender.key}-death` + new Date().getTime(),
			desc: `${defender.name} has died! 💀`,
		};
		event = deathEvent;
	} else if (combatRoll === CombatRoll.Wound) {
		defender.state = STATE_WOUNDED;

		const woundEvent: EventDesc = {
			id: `${defender.key}-wound` + new Date().getTime(),
			desc: `${defender.name} is wounded!`,
		};
		event = woundEvent;
	}

	return event;
}

export function combatRound(
	attacker: Player,
	defender: Player,
	events: EventDesc[]
) {
	const combatRoll = generateFightRoll(attacker, defender);
	events.push(generateFightEvent(combatRoll, attacker, defender));

	const defenderStatusEvent = generateDefenderStatusEvent(combatRoll, defender);

	if (defenderStatusEvent) events.push(defenderStatusEvent);
}
