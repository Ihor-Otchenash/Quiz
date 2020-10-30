import React from 'react';
import Question from './Question';


function Questions({questions}) {
  const questionItems = questions.map(question => (
    <Question key={question.id} question={question} />
  ))

  return (
    <ul>
      {questionItems}
    </ul>
  )
}

export default Questions;
