import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";
import Roster from "../../components/Roster";
import { getPlayers } from "../../DAL/Player";
import players, { deadPlayer, player1 } from "../__fixtures__/players";
jest.mock("../../DAL/Player");

const ROUND_BUTTON = "round-button";

describe("App", () => {
	beforeEach(() => {
		(getPlayers as jest.Mock).mockReturnValue(players);
	});

	test("renders the app page", () => {
		render(<App />);
		const title = screen.getByText(/react royale/i);
		expect(title).toBeInTheDocument();
	});

	test("renders the play again button if theres a winner", () => {
		(getPlayers as jest.Mock).mockReturnValue([player1, deadPlayer]);
		render(<App />);
		const Button = screen.getByTestId(ROUND_BUTTON);
		// simulate click on button
		fireEvent.click(Button);
		const playAgainButton = screen.getByText(/play again/i);
		expect(playAgainButton).toBeInTheDocument();
	});

	describe("<Roster >", () => {
		test("should render the title", () => {
			render(<Roster players={players} />);
			const title = screen.getByText(/roster/i);
			expect(title).toBeInTheDocument();
		});
	});
});
