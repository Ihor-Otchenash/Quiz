import React, {useContext, useState, useEffect} from 'react';
import Question from './Question';
import Results from './Results';

import { Context } from './Context';

const SECONDS_BEFORE_ROUND_START = 3;
const ROUND_LENGTH_SEC = 5;
const initialRoundState = {
  isHostStartedRound: false,
  isRoundRunning: false,
  isRoundFinished: false,
};

function Game() {

  const {
    rooms,
    currentRoomID,
    isHost,
    setCurrentQuestion,
    playerAnswer,
    setPlayerAnswer,
    setCorrectAnswersOfPlayer
  } = useContext(Context);

  const [correctRoundAnswer, setCorrectRoundAnswer] = useState();
  const [roundSecondsRemaining, setRoundSecondsRemaining] = useState() // only for visual representation on how many seconds left
  const [roundState, _setRoundState] = useState({...initialRoundState})
  
  const {questions, players, gameType, currentQuestion} = rooms[currentRoomID];

  // Base function which sets the actual state of the game
  // Resets the previous round state to false and then change to new state
  const setRoundState = (newState) => {
    _setRoundState({
      ...initialRoundState,
      ...newState,
    });
  }

  // Generic timer creation
  const setTimer = (cb, time) => {
    let timer;

    setRoundSecondsRemaining(time);
    timer = setInterval(() => {
      setRoundSecondsRemaining((prevTime) => prevTime - 1);
    }, 1000);

    setTimeout(() => {
      cb();
      clearInterval(timer);
    }, time * 1000);
  }
  
  // When the currentQuestion has changed the new round starts with preparation phase
  useEffect(() => {
    setRoundState({isHostStartedRound: true});
  }, [currentQuestion]);
  
  // As soon as round state changes (based currentQuestion usually)
  useEffect(() => {
    // Start the actual round in SECONDS_BEFORE_ROUND_START seconds
    if (roundState.isHostStartedRound) {
      setTimer(() => setRoundState({isRoundRunning: true}), SECONDS_BEFORE_ROUND_START);
      // To know the correct round answer
      setCorrectRoundAnswer(questions[currentQuestion]?.answers.find(answer => answer.isCorrect));
    }

    // Same logic as above
    if (roundState.isRoundRunning) {
      setTimer(() => setRoundState({isRoundFinished: true}), ROUND_LENGTH_SEC);
    }

    // Checks if the answer is correct after the round has finished
    if (roundState.isRoundFinished) {
      correctRoundAnswer.id === playerAnswer && setCorrectAnswersOfPlayer(prevAnswers => prevAnswers + 1);
      setPlayerAnswer();
    }
  }, [roundState]);
  
  return (
    <>
      {roundState.isHostStartedRound && <p>Get ready! {roundSecondsRemaining}</p>}
      {roundState.isRoundRunning && (
        questions && <>
          <h1>Time remaining: {roundSecondsRemaining}</h1>
          <Question question={questions[currentQuestion]} />
        </>
      )}
      {roundState.isRoundFinished && (
        <>
          <Results players={players} gameType={gameType} maximumPoints={currentQuestion} />
          {isHost && (
            currentQuestion === questions.length - 1
            ? 
            <button>Finish</button>
            :
            <button onClick={() => {setCurrentQuestion(prevQuestionPositionInArray => prevQuestionPositionInArray + 1)}}>Continue</button>)
          }
        </>
      )}
    </>
  )
}

export default Game;
