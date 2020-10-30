import React from 'react';
import InputText from './InputText';
import { Link } from 'react-router-dom';
import { db } from './db';

function SinglePlayer({currentRoomID, currentPlayerName, setCurrentPlayerName}) {

    return (
        <>
            <h1>This is a Single Player game.</h1>
            <h2>Please enter your name:</h2>
            <InputText 
                value={currentPlayerName} 
                placeholder="Your name" 
                onChange={(e) => setCurrentPlayerName(e.target.value)} 
            />
            <Link to="/waiting-room">
                <button
                    onClick={() => {
                        db.ref(`rooms/${currentRoomID}/players/${currentPlayerName}/`).set({
                            answers: "empty",
                            correctAnswers: 0,
                        });
                    }}
                    disabled={!currentPlayerName}
                >Enter Game</button>
            </Link>
        </>
    )
}

export default SinglePlayer;
