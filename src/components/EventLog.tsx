import React from "react";
import { EventDesc } from "../engine/BREngine";
import Event from "./Event";
import "./EventLog.css";

export default function EventLog(props: EventDesc[]) {
	let events: EventDesc[] = props;

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
