import { generateRound, Game, startGame } from "../engine/Round";
import players from "./__fixtures__/players";
import { getPlayers } from "../DAL/Player";
import { getWeapons } from "../DAL/Weapon";
import weapons from "./__fixtures__/weapons";
jest.mock("../DAL/Player");
jest.mock("../DAL/Weapon");

describe("generateRound", () => {
	const game = { players, rounds: [], weapons } as Game;
	const round = generateRound(game);
	it("should return a round", () => {
		expect(round.round).toBeTruthy();
	});

	it("should return a list of players", () => {
		expect(round.players).toBeTruthy();
		expect(round.players.length).toBe(players.length);
	});
});

describe("startGame()", () => {
	beforeEach(() => {
		(getPlayers as jest.Mock).mockReturnValue(players);
		(getWeapons as jest.Mock).mockReturnValue(weapons);
	});

	it("should return a game", () => {
		expect(startGame()).toBeTruthy();
	});

	it("should return a game with players", () => {
		expect(startGame().players).toBeTruthy();
		expect(startGame().players.length).toBe(players.length);
	});

	it("should return a game with rounds", () => {
		expect(startGame().rounds).toBeTruthy();
		expect(startGame().rounds.length).toBe(1);
	});

	it("should return a game with weapons", () => {
		expect(startGame().weapons).toBeTruthy();
		expect(startGame().weapons.length).toBe(weapons.length);
	});
});
