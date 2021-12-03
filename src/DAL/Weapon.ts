export const WEAPON_FISTS: Weapon = {
	key: "fists",
	name: "Fists",
	value: 10,
	types: ["hth"],
};

export const WEAPON_PISTOL: Weapon = {
	key: "pistol",
	name: "Pistol",
	value: 40,
	types: ["ranged"],
};

export interface Weapon {
	key: string;
	name: string;
	value: number;
	types: string[];
}

export function findWeapon(roll: number): Weapon {
	return WEAPON_PISTOL;
}
