import { Player, STATE_WOUNDED } from "./../DAL/Player";
import { WEAPON_PISTOL } from "./../DAL/Weapon";
import {
	generateFightEvent,
	CombatRoll,
	generateFightRoll,
} from "../engine/Combat";
import { player1, player2 } from "./__fixtures__/players";
import { getRandomNumber } from "../engine/Utils";
jest.mock("../engine/Utils.ts");

describe("generateFightEvent", () => {
	it("should generate a win event if roll < threshold", () => {
		expect(generateFightEvent(CombatRoll.Kill, player1, player2).desc).toBe(
			"Player1 kills Player2!"
		);
	});

	it("should generate a wound event if roll is > threshold and < + threshold + 10", () => {
		expect(generateFightEvent(CombatRoll.Wound, player1, player2).desc).toBe(
			"Player1 wounds Player2!"
		);
	});

	it("should generate a miss event if roll is > threshold + 10", () => {
		expect(generateFightEvent(CombatRoll.Miss, player1, player2).desc).toBe(
			"Player1 misses Player2!"
		);
	});
});

describe("generateFightRoll", () => {
	let attacker: Player;
	let defender: Player;

	beforeEach(() => {
		(getRandomNumber as jest.Mock).mockReturnValue(0);
		attacker = { ...player1 };
		defender = { ...player2 };
	});
	it("should return CombatRoll.Kill with a playerRoll < playerThreshold", () => {
		attacker.weapon = WEAPON_PISTOL;
		expect(generateFightRoll(attacker, defender)).toBe(CombatRoll.Kill);
	});

	it("should not return a Kill roll if both players are using hth and are healthy", () => {
		expect(generateFightRoll(attacker, defender)).toBe(CombatRoll.Wound);
	});

	it("should return a Kill roll if defender is already wounded", () => {
		attacker.weapon = WEAPON_PISTOL;
		defender.state = STATE_WOUNDED;
		expect(generateFightRoll(attacker, defender)).toBe(CombatRoll.Kill);
	});

	it("should return a miss roll with a playerRoll > threshold", () => {
		attacker.weapon = WEAPON_PISTOL;
		(getRandomNumber as jest.Mock).mockReturnValue(90);
		expect(generateFightRoll(attacker, defender)).toBe(CombatRoll.Miss);
	});

	it("should return a wound roll with a playerRoll > threshold and playerRoll<= threshold + 10", () => {
		attacker.weapon = WEAPON_PISTOL; // Pistol threshold would be 40
		(getRandomNumber as jest.Mock).mockReturnValue(50);
		expect(generateFightRoll(attacker, defender)).toBe(CombatRoll.Wound);
	});
});
