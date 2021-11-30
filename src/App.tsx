import React, { useState } from "react";
import "./App.scss";
import EventLog from "./components/EventLog";
import Header from "./components/Header";
import Roster from "./components/Roster";
import { generateRound, startGame } from "./engine/Round";

function App() {
	const [round, setRound] = useState(2);
	const [game, setGame] = useState(startGame());
	const nextRound = () => {
		game.rounds.push(generateRound(round, game.players));
		const newRound = game;
		setGame(newRound);
		setRound(round + 1);
	};
	
	return (
		<div className="App">
			<Header />
			<Roster players={game.players} />
			<EventLog rounds={game.rounds} nextRound={nextRound} />
		</div>
	);
}

export default App;
