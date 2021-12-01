import React from "react";
import { render, screen } from "@testing-library/react";
import EventLog from "../../components/EventLog";
import { rounds } from "../__fixtures__/rounds";


const ROUND_BUTTON = "round-button";
describe("<EventLog >", () => {
	it("should render the title", () => {
		render(<EventLog rounds={rounds} nextRound={function (): void {}} />);
		const title = screen.getByText(/event log/i);
		expect(title).toBeInTheDocument();
	});

	

	describe("nextRound", () => {
        it("should render the next round button", () => {
            render(<EventLog rounds={rounds} nextRound={function (): void {}} />);
            const button = screen.getByText(/next round/i);
            expect(button).toBeInTheDocument();
        });

        it("should render the next round button with the start game label when there are no rounds", () => {
            render(<EventLog rounds={[]} nextRound={function (): void {}} />);
            const button = screen.getByTestId(ROUND_BUTTON);
            expect(button).toHaveTextContent(/start game/i);
        });

		it("should call the nextRound function", () => {
			const nextRound = jest.fn();
			render(<EventLog rounds={rounds} nextRound={nextRound} />);
			const button = screen.getByText(/next round/i);
			button.click();
			expect(nextRound).toHaveBeenCalled();
		});
	});
});
