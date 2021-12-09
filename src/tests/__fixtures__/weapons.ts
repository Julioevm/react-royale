import { Weapon } from "../../DAL/Weapon";

export const WEAPON_FISTS: Weapon = {
	key: "fists",
	name: "Fists",
	value: 10,
	types: ["hth"],
	isHtH: true,
};

export const WEAPON_PISTOL: Weapon = {
	key: "pistol",
	name: "Pistol",
	value: 40,
	types: ["ranged"],
};

const weapons = [WEAPON_FISTS, WEAPON_PISTOL];

export default weapons;
