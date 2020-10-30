import React from 'react';

function InputText({value, placeholder, onChange}) {
  return (
    <input
      type='text'
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default InputText;
