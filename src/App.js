import React from 'react';
import {Route, Switch} from 'react-router-dom';
import WelcomePage from './WelcomePage';
import CreateGame from './CreateGame';
import WaitingRoom from './WaitingRoom';
import GameRegistration from './GameRegistration';
import Game from './Game';
import Results from './Results';
import './App.css';

function App() {

  return (
    <>
      <Switch>
        <Route exact path="/"><WelcomePage /></Route>
        <Route path="/game-registration"><GameRegistration /></Route>
        <Route path="/create-game"><CreateGame /></Route>
        <Route path="/waiting-room"><WaitingRoom /></Route>
        <Route path="/game"><Game /></Route>
        <Route path="/results"><Results /></Route>
      </Switch>
    </>
  );
}

export default App;
