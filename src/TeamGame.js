import React from 'react';
import InputText from './InputText';
import { Link } from 'react-router-dom';
import { db } from './db';

function TeamGame({players, currentRoomID, currentPlayerName, setCurrentPlayerName, currentTeamName, setCurrentTeamName}) {

    return (
        <>
            <h1>This is a Team game.</h1>
            <h2>Please enter your Team name:</h2>
            <InputText 
                value={currentTeamName} 
                placeholder="Team name" 
                onChange={(e) => setCurrentTeamName(e.target.value)} 
            />
            <p>Wanna join an existing Team? Choose one from the list:</p>
            <ul>
                {Object.keys(players).map(team => (<li onClick={() => setCurrentTeamName(team)} key={team}>{team}</li>))}
            </ul>
            <p>Please type your nickname in a Team:</p>
            <InputText 
                value={currentPlayerName} 
                placeholder="Your name" 
                onChange={(e) => setCurrentPlayerName(e.target.value)} 
            />
            <Link to="/waiting-room">
                <button
                    onClick={() => {
                        const team = players?.[currentTeamName]
                        console.log(team)
                        db.ref(`rooms/${currentRoomID}/players/${currentTeamName}/${currentPlayerName}`).set({
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

export default TeamGame;
