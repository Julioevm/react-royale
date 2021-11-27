import { EventDesc } from "../engine/BREngine";
import "./Style.scss";

export default function Event(event: EventDesc) {
	return (
		<div key={event.id} className="card card--event">
			{event.desc}
		</div>
	);
}
