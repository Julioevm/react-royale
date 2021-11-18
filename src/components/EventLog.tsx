import React, { useState } from "react";
import Event, { EventDesc } from "./Event";
import "./EventLog.css";

export default function EventLog() {
	const ev1 = { key: 1, desc: "event 1" };
	const ev2 = { key: 2, desc: "event 2" };
	const [events, setEvents] = useState([ev1, ev2] as EventDesc[]);

	return (
		<div className="eventLog">
			<h2>Events will be displayed here!</h2>
			<div className="eventContainer">
				{events.map((event) => (
					<Event key={event.key} desc={event.desc} />
				))}
			</div>
		</div>
	);
}
