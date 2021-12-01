import { generateRound } from "../engine/Round";
import players from "./__fixtures__/players";

describe("generateRound", () => {
	const round = generateRound(1, players);
	it("should return a round", () => {
		expect(round.round).toBeTruthy();
	});

	it("should return a list of players", () => {
		expect(round.players).toBeTruthy();
		expect(round.players.length).toBe(players.length);
	});
});
