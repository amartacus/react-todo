import v4 from 'uuid/v4';
const addTodo = (text) => {
  return {
      type: 'ADD_TODO',
      id: v4(),
      text
  }
};
export default addTodo;