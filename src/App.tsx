import React from "react";
import "./App.css";
import EventLog from "./components/EventLog";
import Header from "./components/Header";

function App() {
	return (
		<div className="App">
			<Header />
			<EventLog />
		</div>
	);
}

export default App;
