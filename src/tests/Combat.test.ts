import { generateFightEvent, CombatRoll } from "../engine/Combat";
import { player1, player2 } from "./__fixtures__/players";

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
