import {
	generateEvent,
	EventDesc,
	generateRoundEvents,
} from "../engine/BREngine";

describe("generateEvent", () => {
	const event: EventDesc = generateEvent(1);
	it("should have a id", () => {
		expect(event.id.toString()).toMatch("1");
	});
	it("shouldn't return an empty string'", () => {
		expect(event.desc).not.toBe("");
	});
});

describe("generateRoundEvents", () => {
	const round = generateRoundEvents(3);
	it("should return a list of events", () => {
		expect(round.length).toBe(3);
	});
});
