import React, {useContext} from 'react'
import Questions from './Questions';
import { Link } from 'react-router-dom';

import { Context } from './Context';

function HostWaitingView() {
    const {rooms, currentRoomID, setGameStarted} = useContext(Context);

    const {gameType, questions} = rooms[currentRoomID];
    // const gameType = room?.gameType;
    // const questions = room?.questions;

    return (
        <>
            <Link to="game">
                <button onClick={() => {
                    setGameStarted(true);
                }}>Start Game</button>
            </Link>
            <div>
                <h2>This is a {gameType === "single" ? "Single Player" : "Team"} game</h2>
                <h2>Questions you have created:</h2>
                <Questions questions={questions}/>
            </div>
        </>
    )
}

export default HostWaitingView;
