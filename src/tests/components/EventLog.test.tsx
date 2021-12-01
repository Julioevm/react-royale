import React from "react";
import { render, screen } from "@testing-library/react";
import EventLog from "../../components/EventLog";
import { rounds } from "../__fixtures__/rounds";

const ROUND_BUTTON = "round-button";
describe("<EventLog >", () => {
	it("should render the title", () => {
		render(<EventLog rounds={rounds} action={function (): void {}} buttonText={"next round"} />);
		const title = screen.getByText(/event log/i);
		expect(title).toBeInTheDocument();
	});

	describe("nextRound", () => {
		it("should render the next round button", () => {
			render(
				<EventLog
					rounds={rounds}
					action={function (): void {}}
					buttonText={"next round"}
				/>
			);
			const button = screen.getByText(/next round/i);
			expect(button).toBeInTheDocument();
		});

		it("should call the nextRound function", () => {
			const nextRound = jest.fn();
			render(
				<EventLog rounds={rounds} action={nextRound} buttonText={"next round"} />
			);
			const button = screen.getByText(/next round/i);
			button.click();
			expect(nextRound).toHaveBeenCalled();
		});
	});
});
