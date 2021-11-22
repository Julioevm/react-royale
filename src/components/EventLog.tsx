import React from "react";
import { Round } from "../engine/BREngine";
import Button from "./Button";
import Event from "./Event";
import "./Style.scss";

export default function EventLog({ rounds }: { rounds: Round[] }) {
	return (
		<div className="container">
			<h2>Event log</h2>
			<Button text="Next Round" onClick={() => {}} />
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
