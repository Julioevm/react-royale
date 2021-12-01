import { generateFightEvent, CombatRoll } from "../engine/Combat";
import player from "./__fixtures__/player";

describe("generateFightEvent", () => {
	const player1 = player;
	const player2 = { ...player, name: "player2" };
	it("should generate a win event if roll < threshold", () => {
		expect(generateFightEvent(CombatRoll.Kill, player1, player2).desc).toBe(
			"Dummy wins!"
		);
	});

	it("should generate a wound event if roll is > threshold and < + threshold + 10", () => {
		expect(generateFightEvent(CombatRoll.Wound, player1, player2).desc).toBe(
			"Dummy wounds player2!"
		);
	});

	it("should generate a miss event if roll is > threshold + 10", () => {
		expect(generateFightEvent(CombatRoll.Miss, player1, player2).desc).toBe(
			"Dummy misses player2!"
		);
	});
});
