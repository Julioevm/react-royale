import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";
import Roster from "../../components/Roster";
import { getPlayers } from "../../DAL/Player";
import players, { deadPlayer, player1 } from "../__fixtures__/players";
import { getWeapons } from "../../DAL/Weapon";
import weapons from "../__fixtures__/weapons";
jest.mock("../../DAL/Player");
jest.mock("../../DAL/Weapon");

const ROUND_BUTTON = "round-button";

describe("App", () => {
	beforeEach(() => {
		(getPlayers as jest.Mock).mockReturnValue(players);
		(getWeapons as jest.Mock).mockReturnValue(weapons);
	});

	test("renders the app page", () => {
		render(<App />);
		const title = screen.getByText(/react royale/i);
		expect(title).toBeInTheDocument();
	});

	test("renders the app with the player cards after starting a game", () => {
		(getPlayers as jest.Mock).mockReturnValue([player1, deadPlayer]);
		render(<App />);
		const Button = screen.getByTestId(ROUND_BUTTON);
		// First click to start game
		fireEvent.click(Button);
		const playerCard = screen.getAllByTestId("player-card");
		expect(playerCard.length).toBe(2);
	});

	test("renders the app with the event log cards after starting a game", () => {
		(getPlayers as jest.Mock).mockReturnValue([player1, deadPlayer]);
		render(<App />);
		const Button = screen.getByTestId(ROUND_BUTTON);
		// First click to start game
		fireEvent.click(Button);
		const eventCard = screen.getAllByTestId("event-card");
		expect(eventCard.length).toBe(1);
	});

	test("renders the play again button if theres a winner", () => {
		(getPlayers as jest.Mock).mockReturnValue([player1, deadPlayer]);
		render(<App />);
		const Button = screen.getByTestId(ROUND_BUTTON);
		// First click to start game
		fireEvent.click(Button);
		// Second click to end game
		fireEvent.click(Button);
		const playAgainButton = screen.getByText(/play again/i);
		expect(playAgainButton).toBeInTheDocument();
	});

	test("renders the winner modal card if theres a winner", () => {
		(getPlayers as jest.Mock).mockReturnValue([player1, deadPlayer]);
		render(<App />);
		const Button = screen.getByTestId(ROUND_BUTTON);
		// First click to start game
		fireEvent.click(Button);
		// Second click to end game
		fireEvent.click(Button);
		expect(screen.getByTestId("modal-card")).toBeVisible();
	});

	describe("<Roster >", () => {
		test("should render the title", () => {
			render(<Roster players={players} />);
			const title = screen.getByText(/roster/i);
			expect(title).toBeInTheDocument();
		});
	});
});
