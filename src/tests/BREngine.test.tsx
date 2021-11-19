import { generateEvent, EventDesc, generateRound } from "../engine/BREngine";

describe("generateEvent", () => {
	const event: EventDesc = generateEvent(1);
	it("should have a key", () => {
		expect(event.key.toString()).toMatch("1");
	});
	it("should return a text description", () => {
		expect(event.desc).toMatch("this is an event!");
	});
});

//a jest test that asserts the function generateRound() returns a list of events
describe("generateRound", () => {
	const round = generateRound(3);
	it("should return a list of events", () => {
		expect(round).toMatchObject([
			{ key: 1, desc: "this is an event!" },
			{ key: 2, desc: "this is an event!" },
			{ key: 3, desc: "this is an event!" },
		]);
	});
});
