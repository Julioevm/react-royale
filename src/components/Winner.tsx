import React from "react";
import { Player } from "../DAL/Player";
import "./Winner.scss";

export default function Winner(props: {
	winner: Player | undefined;
	onClose: () => void;
	show: boolean;
}) {
	if (!props.show) {
		return null;
	}

	return (
		<div className="modal" onClick={props.onClose}>
			<div
				className="modal-card-container"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="modal-card" data-testid={"modal-card"}>
					<h1>The winner is...</h1>
					<img className="image" src={props.winner?.image} alt="Winner portrait" />
					<p className="winnerName">{props.winner?.name}</p>
					<p>{props.winner?.state.name}</p>
					<p>{props.winner?.weapon.name}</p>
					<div className="layers">
						<div className="layer"></div>
						<div className="layer"></div>
						<div className="layer"></div>
						<div className="layer"></div>
						<div className="layer"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
