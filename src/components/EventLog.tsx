import React from "react";
import { EventDesc } from "../engine/BREngine";
import Event from "./Event";
import "./Style.scss";

export default function EventLog({ events }: { events: EventDesc[] }) {
	return (
		<div className="container">
			<h2>Event log</h2>
			<div className="eventContainer">
				{events.map((event) => (
					<Event key={event.key} desc={event.desc} />
				))}
			</div>
		</div>
	);
}
