import React, { useState } from "react";
import "./App.scss";
import EventLog from "./components/EventLog";
import Header from "./components/Header";
import Roster from "./components/Roster";
import { getPlayers } from "./DAL/Player";
import { generateRound, Round } from "./engine/Round";

function App() {
	const [currentRound, setCurrentRound] = useState(1);
	const [players, setPlayers] = useState(getPlayers());
	const [rounds, setRounds] = useState([] as Round[]);
	const nextRound = () => {
		const newGameRound = generateRound(currentRound,players);

		const newRounds = [...rounds, newGameRound.round];
		setRounds(newRounds);
		setPlayers(newGameRound.players);
		setCurrentRound(currentRound + 1);
	};
	
	return (
		<div className="App">
			<Header />
			<Roster players={players} />
			<EventLog rounds={rounds} nextRound={nextRound} />
		</div>
	);
}

export default App;
