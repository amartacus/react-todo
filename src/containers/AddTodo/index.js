import React from 'react';
import { connect } from 'react-redux';
import addTodo from './actions'

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            dispatch(addTodo(input.value));
            input.value = '';
          };

        }}
      />
      {' '}
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo = connect()(AddTodo);