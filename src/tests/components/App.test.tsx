import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import Roster from "../../components/Roster";
import { getPlayers } from "../../DAL/Player";

describe("App", () => {
	test("renders the app page", () => {
		render(<App />);
		const title = screen.getByText(/react royale/i);
		expect(title).toBeInTheDocument();
	});

	test("renders the play again button if theres a winner", () => {
		render(<App />);
		const playAgainButton = screen.getByText(/play again/i);
		expect(playAgainButton).toBeInTheDocument();
	});

	describe("<Roster >", () => {
		const players = getPlayers();

		test("should render the title", () => {
			render(<Roster players={players} />);
			const title = screen.getByText(/roster/i);
			expect(title).toBeInTheDocument();
		});
	});
});
