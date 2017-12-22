/**
 * Actions
 */
import v4 from 'uuid/v4';
const addTodo = (text) => {
  return {
      type: 'ADD_TODO',
      id: v4(),
      text
  }
};
const setVisibilityFilter = (filter) => {
  return {
      type: 'SET_VISIBILITY_FILTER',
      filter
  };
};
const toggleTodo = (id) => {
  return {
      type: 'TOGGLE_TODO',
      id
  };
};

export {addTodo, setVisibilityFilter, toggleTodo};