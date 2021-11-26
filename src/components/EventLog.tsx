import React from "react";
import { Round } from "../engine/BREngine";
import Event from "./Event";
import "./Style.scss";

export default function EventLog({
	rounds,
	nextRound,
}: {
	rounds: Round[];
	nextRound: () => void;
}) {
	return (
		<div className="container">
			<div>
				<h2>Event log</h2>
				<button className="roundButton" onClick={nextRound}>
					Next Round!
				</button>
			</div>
			<div className="eventContainer">
				{rounds.map((round) => (
					<div className="eventRound">
						<h3> {round.name}</h3>
						{round.events.map((event) => (
							<Event {...event} />
						))}
					</div>
				))}
			</div>
		</div>
	);
}
