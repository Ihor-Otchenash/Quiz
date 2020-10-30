import React, {useState, useEffect, useContext} from 'react';
import Questions from './Questions';
import RadioButton from './RadioButton';
import Answers from './Answers';
import InputText from './InputText';
import { db } from './db';

import { Context } from './Context';
import { Link, Redirect } from 'react-router-dom';

function CreateGame() {
  const {
    hostName,
    questions,
    addQuestion,
    answers,
    currentRoomID,
    gameType,
    setGameType,
    setCurrentRoomID,
    correctAnswerIdInQuestion,
    setIsHost,
    gameStarted
  } = useContext(Context);

  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionID, setNewQuestionID] = useState(0);

  const isAllAnswersFilledIn = answers.every((answer) => answer.body);

  // Component only available to Hosts, generates unique room ID on load
  useEffect(() => {
    setCurrentRoomID(Math.random().toString(16).substr(2));
    setIsHost(true);
  }, [])

  // Sets the next question ID on adding questions to the list
  useEffect(() => {
    setNewQuestion("");
    setNewQuestionID(questions.length + 1);
  }, [questions])

  return (
    <>
      {hostName ?
        <>
          <div>
            <h2>Welcome, {hostName}</h2>
            <div>
              <RadioButton 
                value="group" 
                currentState={gameType} 
                onChange={(e) => setGameType(e.target.value)} 
                labelName="Group Game"
              />
              <RadioButton 
                value="single" 
                currentState={gameType} 
                onChange={(e) => setGameType(e.target.value)} 
                labelName="Single Player Game"
              />
            </div>
            <div>
              {questions.length > 0
                ? <Questions questions={questions} />
                : <p>Hmmm... You haven't created any questions yet! Why not to add one?</p>
              }
            </div>
            <div>
              <InputText
                value={newQuestion} 
                placeholder="Question" 
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <Answers />
              <button 
                disabled={!(correctAnswerIdInQuestion && newQuestion && isAllAnswersFilledIn)} 
                onClick={() => addQuestion({id: newQuestionID, body: newQuestion, answers})}
              >Add question</button>
            </div>
          </div>
          <div>
            <Link to="/waiting-room">
              <button
                onClick={() => {
                  db.ref(`rooms/${currentRoomID}`).update({
                    questions,
                    gameType,
                    hostName,
                    players: [],
                    gameStarted,
                  });
                }}
                disabled={!questions.length}
              >Create Game</button>
            </Link>
          </div>
        </>
        : <Redirect to="/" />}
    </>
  )
}

export default CreateGame;

