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

export const WEAPON_TEDDY: Weapon = {
	// Test weapon that ensures 0% kill chance
	key: "teddy",
	name: "Teddy Bear",
	value: 0,
	types: ["fluffy"],
};

export const WEAPON_DECIMATOR: Weapon = {
	// Test weapon that ensures 100% kill chance
	key: "decimator",
	name: "Decimator",
	value: 100,
	types: ["ranged"],
};

export interface Weapon {
	key: string;
	name: string;
	value: number;
	types: string[];
}

export function findWeapon(roll: number): Weapon {
	// TODO: Load weapons from file and search by rarity.
	return WEAPON_PISTOL;
}
