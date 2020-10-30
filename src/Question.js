import React, {useContext} from 'react';

import {Context} from './Context';

function Question({question}) {
  const {body, answers} = question;
  // const answers = question?.answers;

  const {isHost, playerAnswer, setPlayerAnswer} = useContext(Context);

  console.log(playerAnswer)

  return (
    <li>
      <p>{body}</p>
      {answers &&
      <ul>
        {answers.map(answer => (
            <li
              style={playerAnswer !== answer.id ? {color: "black"} : {color: "green"}} key={answer.id}
              onClick={() => !isHost && setPlayerAnswer(answer.id)}
            >
              <h3 style={isHost && answer.isCorrect ? {textDecoration: "underline"} : null}>{answer.body}</h3>
            </li>
          )
        )}
      </ul>}
    </li>
  )
}

export default Question;
