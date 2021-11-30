import { generateIdleEvent, EventDesc } from "../engine/Event";
import player from "./__fixtures__/player";

describe("generateEvent", () => {
	const event: EventDesc = generateIdleEvent(player);
	it("should have a id", () => {
		expect(event.id.toString()).toMatch("1");
	});
	it("shouldn't return an empty string'", () => {
		expect(event.desc).not.toBe("");
	});

	it("should include the players name", () => {
		expect(event.desc).toContain(player.name);
	});
});
