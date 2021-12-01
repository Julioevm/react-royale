import React from "react";
import { Round } from "../engine/Round";
import Event from "./Event";
import "./Style.scss";

export default function EventLog({
	rounds,
	buttonText: text,
	action: nextRound,
}: {
	rounds: Round[];
	buttonText: string;
	action: () => void;
}) {
	return (
		<div className="container">
			<h2>Event log</h2>
			<button
				className="center pushable"
				onClick={nextRound}
				data-testid="round-button"
			>
				<span className="front">{text}</span>
			</button>
			<div className="eventContainer">
				{rounds
					.map((round, index) => (
						<div key={index} className="eventRound">
							<h3> {round.name}</h3>
							{round.events.map((event) => (
								<div key={event.id}>
									<Event {...event} />
								</div>
							))}
						</div>
					))
					.reverse()}
			</div>
		</div>
	);
}
