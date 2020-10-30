import React, {useContext} from 'react';

import { Context } from './Context';

function PlayerWaitingView() {
    const {rooms, currentRoomID, currentPlayerName, currentTeamName} = useContext(Context);

    const {gameType} = rooms[currentRoomID];
    // const gameType = room?.gameType;

    return (
        <>
            <h2>Hello, {currentPlayerName}!</h2>
            {gameType === "group" && <p>You're a part of Team {currentTeamName}.</p>}
            <p>This is a waiting room. As soon as the host starts the game it will begin.</p>
        </>
    )
}

export default PlayerWaitingView;
