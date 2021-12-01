import { STATE_DEAD, STATE_HEALTHY, WEAPON_FISTS } from "../../DAL/Player";

export const player1 = {
	key: "test1",
	name: "Player1",
	weapon: WEAPON_FISTS,
	state: STATE_HEALTHY,
};

export const player2 = {
	key: "test2",
	name: "Player2",
	weapon: WEAPON_FISTS,
	state: STATE_HEALTHY,
};

export const deadPlayer = {
	key: "testDead",
	name: "Player3",
	weapon: WEAPON_FISTS,
	state: STATE_DEAD,
};

const players = [player1, player2, deadPlayer];

export default players;
