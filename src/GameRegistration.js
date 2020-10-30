import React, {useContext} from 'react';
import SinglePlayer from './SinglePlayer';
import TeamGame from './TeamGame';
import { Redirect } from 'react-router-dom';

import { Context } from './Context';


function GameRegistration() {
  const {
    rooms,
    currentRoomID,
    currentPlayerName,
    setCurrentPlayerName,
    currentTeamName,
    setCurrentTeamName,
  } = useContext(Context);

  const room = rooms[currentRoomID];
  const players = room?.players;
  const gameType = room?.gameType;
  
  return (
    <>
        {room ?
            gameType === "single" ? 
                <SinglePlayer 
                  players={players || []} 
                  currentRoomID={currentRoomID} 
                  currentPlayerName={currentPlayerName} 
                  setCurrentPlayerName={setCurrentPlayerName}
                /> 
              :
                <TeamGame 
                  players={players || []} 
                  currentRoomID={currentRoomID} 
                  currentPlayerName={currentPlayerName} 
                  setCurrentPlayerName={setCurrentPlayerName} 
                  currentTeamName={currentTeamName} 
                  setCurrentTeamName={setCurrentTeamName}
                /> 
          :
            <Redirect to="/" />
        }
    </>
  )
}

export default GameRegistration;
