import { Player } from "../DAL/Player";
import { generateRound } from "../engine/Round";
import player from "./__fixtures__/player";

const players: Player[] = [player, player];

describe("generateRound", () => {
	const round = generateRound(1, players);
	it("should return a round", () => {
		expect(round.round).toBeTruthy();
	});

	it("should return a list of players", () => {
		expect(round.players).toBeTruthy();
		expect(round.players.length).toBe(2);
	});
});
