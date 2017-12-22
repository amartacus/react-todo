import { combineReducers } from 'redux';
import undoable from 'redux-undo';
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(e => {
        return e.id !== action.id ? e : { ...e, completed: !e.completed };
      });
    default:
      return state;
  }
};
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos: undoable(todos),
  visibilityFilter
});

export default todoApp;