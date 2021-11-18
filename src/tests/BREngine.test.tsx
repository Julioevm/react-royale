import { generateEvent } from "../engine/BREngine";

describe("generateEvent", () => {
	it("should return a text description", () => {
		expect(generateEvent().desc).toMatch("this is an event!");
	});
});
