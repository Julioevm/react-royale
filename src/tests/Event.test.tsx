import { generatePlayerEvent, EventDesc } from "../engine/Event";
import { player1 } from "./__fixtures__/players";
import weapons from "./__fixtures__/weapons";

describe("generateEvent", () => {
	const event: EventDesc = generatePlayerEvent(player1, weapons);
	it("should have a id", () => {
		expect(event.id.toString()).toMatch("1");
	});
	it("shouldn't return an empty string'", () => {
		expect(event.desc).not.toBe("");
	});

	it("should include the players name", () => {
		expect(event.desc).toContain(player1.name);
	});
});
