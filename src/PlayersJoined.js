import React, {useContext} from 'react';

import { Context } from './Context';


function PlayersJoined() {

    const {rooms, currentRoomID} = useContext(Context);

    const {players = [], gameType} = rooms[currentRoomID];
    // const players = room?.players || [];
    // const gameType = room?.gameType;

    return (
        <div>
            <h2>{gameType === "single" ? "Players who joined" : "Team which joined"}:</h2>
            {gameType === "single" ?
                Object.keys(players).map(player => (<p key={player}>{player}</p>))
            : 
                Object.keys(players).map(team => (<p onMouseOver={() => console.log(players[team])} key={team}>{team}</p>))
            }
        </div>
    )
}

export default PlayersJoined;
      