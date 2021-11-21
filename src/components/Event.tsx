import React from "react";
import { EventDesc } from "../engine/BREngine";
import "./Style.scss";

export default function Event(props: EventDesc) {
	return <div className="card card--event">{props.desc}</div>;
}
