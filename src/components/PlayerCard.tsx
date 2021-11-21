import React from "react";
import profile from "../assets/images/profile.png";
import "./Style.scss";

export default function PlayerCard() {
	return (
		<div className="playerCard">
			<img src={profile} alt="Player profile" width="70px" height="90px"></img>
			<div className="playerCardInfo">
				<div>Player Name</div>
				<div className="smaller playerWeapon">Weapon</div>
				<div className="smaller playerStatus">Healthy</div>
			</div>
		</div>
	);
}
