import React from 'react';

function RadioButton({value, currentState, onChange, labelName}) {
  return (
    <label>
        <input 
            type="radio" 
            value={value}
            checked={currentState === value}
            onChange={onChange}
        /> {labelName}
    </label>
  )
}

export default RadioButton;
