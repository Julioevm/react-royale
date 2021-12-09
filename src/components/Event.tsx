import React from "react";
import { EventDesc } from "../engine/Event";
import "./Style.scss";

export default function Event(event: EventDesc) {
	return (
		<div className="card card--event" data-testid="event-card">
			{event.desc}
		</div>
	);
}
