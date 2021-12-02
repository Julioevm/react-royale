import React from "react";
import { Player, STATE_DEAD } from "../DAL/Player";
import profile from "../assets/images/profile.png";
import cross from "../assets/images/cross.png";
import "./Style.scss";

export default function PlayerCard(player: Player) {
	return (
		<div className="card card--player">
			<img src={player.image || profile} alt="Player profile"></img>
			{player.state === STATE_DEAD && (
				<img className={"img-cross"} src={cross} alt="Player profile" />
			)}
			<div className="playerCardInfo">
				<div>{player.name}</div>
				<div className="smaller playerWeapon">{player.weapon.name}</div>
				<div className="smaller playerStatus" style={player.state.style}>
					{player.state.name}
				</div>
			</div>
		</div>
	);
}
