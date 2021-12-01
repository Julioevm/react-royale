import React, { useState } from "react";
import "./App.scss";
import EventLog from "./components/EventLog";
import Header from "./components/Header";
import Roster from "./components/Roster";
import Winner from "./components/Winner";
import { getPlayers, Player, STATE_DEAD } from "./DAL/Player";
import { generateRound, Round } from "./engine/Round";

function App() {
	const [currentRound, setCurrentRound] = useState(1);
	const [players, setPlayers] = useState(getPlayers());
	const [rounds, setRounds] = useState([] as Round[]);
	const [winner, setWinner] = useState<Player>();
	const [show, setShow] = useState(false);

	const nextRound = () => {
		const newGameRound = generateRound(currentRound, players);

		const newRounds = [...rounds, newGameRound.round];
		setRounds(newRounds);
		setPlayers(newGameRound.players);
		setCurrentRound(currentRound + 1);
		const livePlayers = players.filter((p) => p.state !== STATE_DEAD);
		if (livePlayers.length === 1) {
			setWinner(livePlayers[0]);
			setShow(true);
		}
	};

	return (
		<div className="App">
			<Header />
			<Roster players={players} />
			<EventLog rounds={rounds} nextRound={nextRound} />
			<Winner winner={winner} onClose={() => setShow(false)} show={show} />
		</div>
	);
}

export default App;
