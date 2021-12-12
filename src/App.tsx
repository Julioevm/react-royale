import React, { useState, lazy, Suspense } from "react";
import "./App.scss";
import EventLog from "./components/EventLog";
import Header from "./components/Header";
import * as Scroll from "react-scroll";
import Winner from "./components/Winner";
import { Player, STATE_DEAD } from "./DAL/Player";
import { EMPTY_GAME, Game, generateRound, startGame } from "./engine/Round";
import useWindowSize from "./utils/useWindowSize";

const Roster = lazy(() => import("./components/Roster"));

function App() {
	const [game, setGame] = useState<Game>(EMPTY_GAME);
	const [winner, setWinner] = useState<Player | undefined>(undefined);
	const [show, setShow] = useState(false);
	const isMobile = useWindowSize().width < 768;
	const scroll = Scroll.scroller;

	const buttonText = () => {
		if (winner) {
			return "Play Again";
		} else if (game.rounds.length === 0) {
			return "Start Game";
		} else {
			return "Next Round!";
		}
	};

	const isNewGame = () => {
		return game.rounds.length === 0;
	};

	const nextRound = () => {
		const newGameRound = generateRound(game);

		const newRounds = [...game.rounds, newGameRound.round];
		setGame({ ...game, rounds: newRounds, players: newGameRound.players });
		const livePlayers = game.players.filter((p) => p.state !== STATE_DEAD);
		if (livePlayers.length === 1) {
			setWinner(livePlayers[0]);
			setShow(true);
		} else if (isMobile) {
			scroll.scrollTo("myScrollToElement", {
				duration: 1500,
				delay: 200,
				smooth: true,
				offset: 200,
			});
		}
	};

	const restart = () => {
		setGame(startGame());
		setWinner(undefined);
		setShow(false);
	};

	const buttonAction = () => {
		if (isNewGame() || winner) {
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
				<Roster players={game.players} />
			</Suspense>
			<EventLog
				rounds={game.rounds}
				action={buttonAction()}
				buttonText={buttonText()}
			/>
			<Winner winner={winner} onClose={() => setShow(false)} show={show} />
		</div>
	);
}

export default App;
