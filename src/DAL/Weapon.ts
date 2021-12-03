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
export interface Weapon {
	key: string;
	name: string;
	value: number;
	types: string[];
	isHtH?: boolean;
}

export function findWeapon(roll: number): Weapon {
	// TODO: Load weapons from file and search by rarity.
	return WEAPON_PISTOL;
}
