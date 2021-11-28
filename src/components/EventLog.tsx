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
			<div className="logHeader">
				<h2>Event log</h2>
				<button className="pushable" onClick={nextRound}>
					<span className="front">Next Round!</span>
				</button>
			</div>
			<div className="eventContainer">
				{rounds
					.map((round, index) => (
						<div key={index} className="eventRound">
							<h3> {round.name}</h3>
							{round.events.map((event, index) => (
								<div key={index}>
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
