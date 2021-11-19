import React from "react";
import "./App.scss";
import EventLog from "./components/EventLog";
import Header from "./components/Header";
import { EventDesc, generateRound } from "./engine/BREngine";

const events: EventDesc[] = generateRound(3);

function App() {
	return (
		<div className="App">
			<Header />
			<div>
				<h2>Roster</h2>
			</div>
			<EventLog events={events} />
		</div>
	);
}

export default App;
