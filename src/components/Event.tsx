import React from "react";
import "./Event.css";

export interface EventDesc {
	key: number;
	desc: string;
}

export default function Event(props: EventDesc) {
	return <div className="event">{props.desc}</div>;
}
