import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import InputText from './InputText';
import './App.css';

import {Context} from './Context';

function App() {
    const {hostName, setHostName, currentRoomID, setCurrentRoomID} = useContext(Context)

    return (
        <>
            <header>Welcome to Quiz Game!</header>
            <div>
                <h1>Are you a host? Please enter your name:</h1>
                <p>
                <InputText value={hostName} placeholder="Name" onChange={(e) => setHostName(e.target.value)} />
                <Link to="/create-game"><button disabled={hostName ? false : true}>Continue</button></Link>
                </p>
            </div>
            <div>
                <h1>Are you a player? Please provide Game ID to enter:</h1>
                <p>
                <InputText value={currentRoomID} placeholder="Game ID" onChange={(e) => setCurrentRoomID(e.target.value)} />
                <Link to="/game-registration"><button disabled={currentRoomID ? false : true}>Join</button></Link>
                </p>
            </div>
        </>
    );
}

export default App;
