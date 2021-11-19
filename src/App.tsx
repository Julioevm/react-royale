import React from "react";
import "./App.css";
import EventLog from "./components/EventLog";
import Header from "./components/Header";
import { EventDesc, generateEvent } from "./engine/BREngine";

const events: EventDesc[] = [];
events.push(generateEvent());
events.push(generateEvent());
events.push(generateEvent());

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
