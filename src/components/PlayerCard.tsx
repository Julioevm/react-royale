import React from "react";
import { Player } from "../DAL/Player";
import profile from "../assets/images/profile.png";
import "./Style.scss";

export default function PlayerCard(player: Player) {
	return (
		<div className="card card--player">
			<img src={profile} alt="Player profile" width="70px" height="90px"></img>
			<div className="playerCardInfo">
				<div>{player.name}</div>
				<div className="smaller playerWeapon">{player.weapon}</div>
				<div className="smaller playerStatus" style={player.state.style}>
					{player.state.name}
				</div>
			</div>
		</div>
	);
}
