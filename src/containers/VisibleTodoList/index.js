import React from 'react';
import { connect } from 'react-redux';
import toggleTodo from './actions';
import Todo from '../../components/Todo';

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />)}
  </ul>
);

const getVisibleTodos = (todos, filter) => {
  switch(filter){
      case 'SHOW_ALL':
          return todos;
      case 'SHOW_COMPLETED':
          return todos.filter(e => e.completed);
      case 'SHOW_ACTIVE':
          return todos.filter(e => !e.completed);
      default:
          return todos;
  }
};

const mapStateToTodoListProps = (state) => {
  console.log(state.todos.present);
  return {
    todos: getVisibleTodos(state.todos.present, state.visibilityFilter)
  }
};
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  };
};
export default connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);