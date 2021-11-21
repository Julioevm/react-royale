import { STATE_HEALTHY, getPlayers } from "../DAL/Player";
describe("initializePlayers", () => {
	const player = { key: "key", name: "name" };

    jest.mock("../DAL/Player", () => ({
        getPlayers: jest.fn(() => [player]),
    }));
    
	it("should return an initialized array of player objects", () => {
		const initializedPlayers = getPlayers();
		expect(initializedPlayers).toEqual([
			{ key: "key", name: "name", weapon: "None", state: STATE_HEALTHY },
		]);
	});
});
