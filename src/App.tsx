import React from "react";
import "./App.scss";
import EventLog from "./components/EventLog";
import Header from "./components/Header";
import Roster from "./components/Roster";
import { EventDesc, generateRound } from "./engine/BREngine";

const events: EventDesc[] = generateRound(3);

function App() {
	return (
		<div className="App">
			<Header />
			<Roster />
			<EventLog events={events} />
		</div>
	);
}

export default App;
