import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import Roster from "../components/Roster";
import EventLog from "../components/EventLog";
import { rounds } from "./__fixtures__/rounds";
import { getPlayers } from "../DAL/Player";

test("renders the app page", () => {
	render(<App />);
	const title = screen.getByText(/React Royale/i);
	expect(title).toBeInTheDocument();
});

describe("<Roster >", () => {
	const players = getPlayers();

	test("should render the title", () => {
		render(<Roster players={players} />);
		const title = screen.getByText(/Roster/i);
		expect(title).toBeInTheDocument();
	});
});

describe("<EventLog >", () => {
	test("should render the title", () => {
		render(<EventLog rounds={rounds} />);
		const title = screen.getByText(/Event Log/i);
		expect(title).toBeInTheDocument();
	});
});
