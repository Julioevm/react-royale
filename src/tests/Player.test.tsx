import { STATE_HEALTHY, initializePlayers } from "../DAL/Player";

describe("initializePlayers", () => {
	const player = { key: "key", name: "name" };

	it("should return an initialized array of player objects", () => {
		const initializedPlayers = initializePlayers([player]);
		expect(initializedPlayers).toEqual([
			{
				key: "key",
				name: "name",
				weapon: "None",
				state: STATE_HEALTHY,
			},
		]);
	});
});
