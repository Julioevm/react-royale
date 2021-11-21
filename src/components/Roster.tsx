import React from "react";
import PlayerCard from "./PlayerCard";
import "./Style.scss";

export default function Roster() {
	return (
		<div className="container">
			<h2>Roster</h2>
			<div className="playerCardContainer">
				<PlayerCard />
				<PlayerCard />
				<PlayerCard />
				<PlayerCard />
			</div>
		</div>
	);
}
