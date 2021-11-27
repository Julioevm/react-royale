import React from "react";
import { Player } from "../DAL/Player";
import PlayerCard from "./PlayerCard";
import "./Style.scss";

export default function Roster({ players }: { players: Player[] }) {
	return (
		<div className="container">
			<h2>Roster</h2>
			<div className="playerCardContainer">
				{players.map((player) => ( 
					<PlayerCard {...player} />
				))}
			</div>
		</div>
	);
}
