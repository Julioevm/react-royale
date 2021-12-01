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
				<div className="modal-card">
					<h1>Winner!</h1>
					<div>{props.winner?.name}</div>
					<div>{props.winner?.state.name}</div>
					<div>{props.winner?.weapon.name}</div>
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
