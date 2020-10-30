import React, {useEffect, useContext} from 'react';
import Answer from './Answer';

import {Context} from './Context';

function Answers() {
  const {answers, setAnswers, correctAnswerIdInQuestion} = useContext(Context);

  useEffect(() => {
    setAnswers(prevAnswers => 
      prevAnswers.map(answer => 
        answer.id === correctAnswerIdInQuestion
        ?
          {...answer, isCorrect: true}
        :
          {...answer, isCorrect: false})
        )
  }, [correctAnswerIdInQuestion])

  return (
    <ul>
      {answers.map(answer => (
        <Answer key={answer.id} answer={answer} setAnswers={setAnswers} />
      ))}
    </ul>
  )
}

export default Answers;
