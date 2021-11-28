import React from "react";
import { EventDesc } from "../engine/BREngine";
import "./Style.scss";

export default function Event(event: EventDesc) {
	return (
		<div className="card card--event">
			{event.desc}
		</div>
	);
}
