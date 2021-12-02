import React, { useState, lazy, Suspense } from "react";
import "./App.scss";
import EventLog from "./components/EventLog";
import Header from "./components/Header";

import Winner from "./components/Winner";
import { getPlayers, Player, STATE_DEAD } from "./DAL/Player";
import { generateRound, Round } from "./engine/Round";

const Roster = lazy(() => import("./components/Roster"));

function App() {
	const [currentRound, setCurrentRound] = useState(1);
	const [players, setPlayers] = useState(getPlayers());
	const [rounds, setRounds] = useState([] as Round[]);
	const [winner, setWinner] = useState<Player | undefined>(undefined);
	const [show, setShow] = useState(false);
	const buttonText = () => {
		if (winner) {
			return "Play Again";
		} else if (rounds.length === 0) {
			return "Start Game";
		} else {
			return "Next Round!";
		}
	};

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

	const restart = () => {
		setPlayers(getPlayers());
		setCurrentRound(1);
		setRounds([]);
		setWinner(undefined);
		setShow(false);
	};

	const buttonAction = () => {
		if (winner) {
			return restart;
		} else {
			return nextRound;
		}
	};

	const renderLoader = () => <div>Loading...</div>;

	return (
		<div className="App">
			<Header />
			<Suspense fallback={renderLoader()}>
			<Roster players={players} />
		</Suspense>
			<EventLog
				rounds={rounds}
				action={buttonAction()}
				buttonText={buttonText()}
			/>
			<Winner winner={winner} onClose={() => setShow(false)} show={show} />
		</div>
	);
}

export default App;
