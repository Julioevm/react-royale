import React from "react";
import "./App.scss";
import EventLog from "./components/EventLog";
import Header from "./components/Header";
import Roster from "./components/Roster";
import { getPlayers } from "./DAL/Player";
import { Round, generateRoundEvents } from "./engine/BREngine";

const players = getPlayers();
const rounds: Round[] = [
	{ id: 0, name: "Day 1", events: generateRoundEvents(3) },
];

function App() {
	return (
		<div className="App">
			<Header />
			<Roster players={players} />
			<EventLog rounds={rounds} />
		</div>
	);
}

export default App;
