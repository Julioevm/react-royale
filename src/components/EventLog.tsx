import React from "react";
import { Round } from "../engine/Round";
import Event from "./Event";
import "./Style.scss";
import useWindowSize from "../utils/useWindowSize";
import * as Scroll from "react-scroll";

export default function EventLog({
	rounds,
	buttonText: text,
	action: nextRound,
}: {
	rounds: Round[];
	buttonText: string;
	action: () => void;
}) {
	const isMobile = useWindowSize().width < 768;
	const isDesktop = !isMobile;
	const Element  = Scroll.Element;

	const button = (
		<button
		id={"round-button"}
			className="center pushable"
			onClick={nextRound}
			data-testid="round-button"
		>
			<span className="front">{text}</span>
		</button>
	);

	const roundList = rounds.map((round, index) => (
		<div key={index} className="eventRound">
			<h3> {round.name}</h3>
			{round.events.map((event) => (
				<div key={event.id}>
					<Event {...event} />
				</div>
			))}
		</div>
	));

	return (
		<div id="event-log" className="container">
			<h2>Events</h2>
			{isDesktop && button}
			<div className="eventContainer">
				{isDesktop ? roundList.reverse() : roundList}
			</div>
			{isMobile && button}
			<Element name="myScrollToElement"></Element>
		</div>
	);
}
