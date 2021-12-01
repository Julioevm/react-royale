import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import Roster from "../../components/Roster";
import { getPlayers } from "../../DAL/Player";

test("renders the app page", () => {
	render(<App />);
	const title = screen.getByText(/react royale/i);
	expect(title).toBeInTheDocument();
});

describe("<Roster >", () => {
	const players = getPlayers();

	test("should render the title", () => {
		render(<Roster players={players} />);
		const title = screen.getByText(/roster/i);
		expect(title).toBeInTheDocument();
	});
});
