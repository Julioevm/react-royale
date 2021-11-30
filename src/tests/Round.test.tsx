import { Player } from "../DAL/Player";
import { generateRound } from "../engine/Round";
import player from "./__fixtures__/player";

const players: Player[] = [player, player];


describe("generateRound", () => {
	const round = generateRound(1, players);
	it("should return a list of events as long as the player list", () => {
		expect(round.events.length).toBe(players.length);
	});
});
