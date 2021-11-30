import { generateFightEvent } from "../engine/Combat";
import player from "./__fixtures__/player";

describe("generateFightEvent", () => {
	const SuccessRoll = { playerRoll: 30, playerThreshold: 60 };
	const WoundRoll = { playerRoll: 65, playerThreshold: 60 };
	const MissRoll = { playerRoll: 90, playerThreshold: 60 };
	const player1 = player;
	const player2 = { ...player, name: "player2" };
	it("should generate a win event if roll < threshold", () => {
		expect(generateFightEvent(SuccessRoll, player1, player2).desc).toBe(
			"Dummy wins!"
		);
	});

	it("should generate a wound event if roll is > threshold and < + threshold + 10", () => {
		expect(generateFightEvent(WoundRoll, player1, player2).desc).toBe(
			"Dummy wounds player2!"
		);
	});

	it("should generate a miss event if roll is > threshold + 10", () => {
		expect(generateFightEvent(MissRoll, player1, player2).desc).toBe(
			"Dummy misses player2!"
		);
	});
});
