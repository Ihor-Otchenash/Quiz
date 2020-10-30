import React, {useContext} from 'react';
import RadioButton from './RadioButton';
import InputText from './InputText';

import {Context} from './Context';

function Answer({answer, setAnswers}) {
  const {correctAnswerIdInQuestion, setCorrectAnswerIdInQuestion} = useContext(Context);

  return (
    <li>
      <RadioButton value={answer.id} currentState={correctAnswerIdInQuestion} onChange={() => setCorrectAnswerIdInQuestion(answer.id)} labelName="Is Correct Answer?" />
      <InputText value={answer.body} placeholder={`Answer ${answer.id}`} onChange={({target: {value}}) => {
        setAnswers(prevAnswers => prevAnswers.map(prevAnswer => 
          prevAnswer.id === answer.id
          ?
            {...prevAnswer, body: value}
          :
            prevAnswer)
        )
      }}/>
    </li>
  )
}

export default Answer;
