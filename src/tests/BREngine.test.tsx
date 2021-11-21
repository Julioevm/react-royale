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
	it("should return a text description", () => {
		expect(event.desc).toMatch("this is an event!");
	});
});

describe("generateRoundEvents", () => {
	const round = generateRoundEvents(3);
	it("should return a list of events", () => {
		expect(round).toMatchObject([
			{ id: 1, desc: "this is an event!" },
			{ id: 2, desc: "this is an event!" },
			{ id: 3, desc: "this is an event!" },
		]);
	});
});
