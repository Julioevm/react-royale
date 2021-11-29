import { Player } from "../DAL/Player";
import { generateEvent, EventDesc, generateRound } from "../engine/BREngine";
import player from "./__fixtures__/player";

const players: Player[] = [player, player];
describe("generateEvent", () => {
	const event: EventDesc = generateEvent(player);
	it("should have a id", () => {
		expect(event.id.toString()).toMatch("1");
	});
	it("shouldn't return an empty string'", () => {
		expect(event.desc).not.toBe("");
	});

	it('should include the players name', () => {
		expect(event.desc).toContain(player.name);
	})
	
});

describe("generateRound", () => {
	const round = generateRound(1, players);
	it("should return a list of events as long as the player list", () => {
		expect(round.events.length).toBe(players.length);
	});
});
