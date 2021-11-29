import { STATE_HEALTHY, initializePlayers, WEAPON_FISTS } from "../DAL/Player";

describe("initializePlayers", () => {
	const player = { key: "key", name: "name" };

	it("should return an initialized array of player objects", () => {
		const initializedPlayers = initializePlayers([player]);
		expect(initializedPlayers).toEqual([
			{
				key: "key",
				name: "name",
				weapon: WEAPON_FISTS,
				state: STATE_HEALTHY,
			},
		]);
	});
});
