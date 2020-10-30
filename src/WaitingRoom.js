import React, {useContext} from 'react';
import HostWaitingView from './HostWaitingView';
import PlayerWaitingView from './PlayerWaitingView';
import PlayersJoined from './PlayersJoined';
import { Redirect } from 'react-router-dom';

import { Context } from './Context';

function WaitingRoom() {
  const {rooms, currentRoomID, isHost} = useContext(Context);
  console.log(currentRoomID)

  const {gameStarted} = rooms[currentRoomID];
  // const gameStarted = room?.gameStarted -> ?. doesn't work since rooms might be undefined yet, change to one room!!!

  return (
    <>
      {currentRoomID ? 
        <>
          <h1>This is a waiting room {currentRoomID}</h1>
          {isHost
            ?
              <HostWaitingView />
            :
              gameStarted ?
                <Redirect to="game" />
              :
                <PlayerWaitingView />
          }
          <PlayersJoined />
        </>
      : <Redirect to="/" />}
    </>
  )
}

export default WaitingRoom;
