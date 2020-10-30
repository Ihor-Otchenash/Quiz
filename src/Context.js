import React, {useState, createContext, useEffect} from 'react';
import { db } from './db';


const Context = createContext();

function ContextProvider({children}) {

  const ANSWERS_BLUEPRINT = [
    {id: 1, body: "", isCorrect: false}, 
    {id: 2, body: "", isCorrect: false}, 
    {id: 3, body: "", isCorrect: false}, 
    {id: 4, body: "", isCorrect: false},
  ];

  const TEST_QUESTIONS = [
    {id: 1, body: "Question 1", answers: [
      {id: 1, body: "1.1", isCorrect: true}, 
      {id: 2, body: "1.2", isCorrect: false}, 
      {id: 3, body: "1.3", isCorrect: false}, 
      {id: 4, body: "1.4", isCorrect: false},
    ]},
    {id: 2, body: "Question 2", answers: [
      {id: 1, body: "2.1", isCorrect: false}, 
      {id: 2, body: "2.2", isCorrect: true}, 
      {id: 3, body: "2.3", isCorrect: false}, 
      {id: 4, body: "2.4", isCorrect: false},
    ]},
  ];

  const [hostName, setHostName] = useState("");
  const [questions, setQuestions] = useState(TEST_QUESTIONS); // []
  const [answers, setAnswers] = useState(ANSWERS_BLUEPRINT);
  const [correctAnswerIdInQuestion, setCorrectAnswerIdInQuestion] = useState(); // used only during question creation
  const [gameType, setGameType] = useState("single");
  const [rooms, setRooms] = useState({}); // all rooms are not needed -> change
  const [currentRoomID, setCurrentRoomID] = useState("");
  const [currentPlayerName, setCurrentPlayerName] = useState("");
  const [currentTeamName, setCurrentTeamName] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerAnswer, setPlayerAnswer] = useState();
  const [correctAnswersOfPlayer, setCorrectAnswersOfPlayer] = useState(0);

  // Fetches all rooms on load
  useEffect(() => {
    db.ref('rooms').on("value", roomsData => setRooms(roomsData.val()));
  }, [])

  // Resets answers and correct answers as soon as the question is added to the questions list
  useEffect(() => {
    setAnswers(ANSWERS_BLUEPRINT);
    setCorrectAnswerIdInQuestion("");
  }, [questions])

  // Set the status of the game as soon as it was changed
  useEffect(() => {
    currentRoomID && db.ref(`rooms/${currentRoomID}/gameStarted`).set(gameStarted);
  }, [gameStarted])
  
  // Set the current question of the round
  useEffect(() => {
    currentRoomID && db.ref(`rooms/${currentRoomID}/currentQuestion`).set(currentQuestion);
  }, [currentQuestion, currentRoomID])

  // Set the player's answer based on the game type -> change
  useEffect(() => {
    if (playerAnswer && currentPlayerName) {
      !currentTeamName && db.ref(`rooms/${currentRoomID}/players/${currentPlayerName}/answers/${currentQuestion}/`).set(playerAnswer);
      currentPlayerName && db.ref(`rooms/${currentRoomID}/players/${currentTeamName}/${currentPlayerName}/answers/${currentQuestion}/`).set(playerAnswer);
    }
  }, [playerAnswer])

  // Set the correct answers of player for further calculation -> change
  useEffect(() => {
    if (currentPlayerName) {
      !currentTeamName && db.ref(`rooms/${currentRoomID}/players/${currentPlayerName}/correctAnswers/`).set(correctAnswersOfPlayer);
      currentPlayerName && db.ref(`rooms/${currentRoomID}/players/${currentTeamName}/${currentPlayerName}/correctAnswers/`).set(correctAnswersOfPlayer);
    }
  }, [correctAnswersOfPlayer])
  
  const addQuestion = (question) => {
    setQuestions(prevQuestions => [...prevQuestions, question])
  }

  return (
    <Context.Provider value={{
      hostName,
      setHostName,
      questions,
      addQuestion,
      answers,
      setAnswers,
      correctAnswerIdInQuestion,
      setCorrectAnswerIdInQuestion,
      currentRoomID,
      rooms,
      gameType,
      setGameType,
      setCurrentRoomID,
      isHost,
      setIsHost,
      currentPlayerName,
      setCurrentPlayerName,
      currentTeamName,
      setCurrentTeamName,
      gameStarted,
      setGameStarted,
      currentQuestion,
      setCurrentQuestion,
      playerAnswer,
      setPlayerAnswer,
      correctAnswersOfPlayer,
      setCorrectAnswersOfPlayer,
    }}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context};
