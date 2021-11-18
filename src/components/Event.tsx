import React from "react";
import { EventDesc } from "../engine/BREngine";
import "./Event.css";

export default function Event(props: EventDesc) {
	return <div className="event">{props.desc}</div>;
}
