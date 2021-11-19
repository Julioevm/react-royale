import React from "react";
import { EventDesc } from "../engine/BREngine";
import Event from "./Event";
import "./EventLog.scss";

export default function EventLog({ events }: { events: EventDesc[] }) {
	return (
		<div className="eventLog">
			<h2>Event log</h2>
			<div className="eventContainer">
				{events.map((event) => (
					<Event key={event.key} desc={event.desc} />
				))}
			</div>
		</div>
	);
}
