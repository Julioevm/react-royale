import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import Roster from "../components/Roster";
import EventLog from "../components/EventLog";
import { rounds } from "./__fixtures__/rounds";
import { getPlayers } from "../DAL/Player";

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

describe("<EventLog >", () => {
	test("should render the title", () => {
		render(<EventLog rounds={rounds} nextRound={function (): void {} } />);
		const title = screen.getByText(/event log/i);
		expect(title).toBeInTheDocument();
	});

	test("should render the next round button", () => {
		render(<EventLog rounds={rounds} nextRound={function (): void {}} />);
		const button = screen.getByText(/next round/i);
		expect(button).toBeInTheDocument();
	});

	describe("nextRound", () => {
		test("should call the nextRound function", () => {
			const nextRound = jest.fn();
			render(<EventLog rounds={rounds} nextRound={nextRound} />);
			const button = screen.getByText(/next round/i);
			button.click();
			expect(nextRound).toHaveBeenCalled();
		});
	});
});
