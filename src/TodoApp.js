// Todoapp
import React from 'react';
import { connect } from 'react-redux';
import {addTodo, setVisibilityFilter, toggleTodo} from './actions';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

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
const Link = ({active, children, onClick}) => {
    if(active){
        return <span>{children}</span>;
    }
    return(
        <span className="link"
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
        >
        {children}
        </span>
    );
};
const mapStateToFilterLinkProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    };
};

const mapDispatchToFilterLinkProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter));
        }
    };
};
const FilterLink = connect(mapStateToFilterLinkProps, mapDispatchToFilterLinkProps)(Link);

const Todo = ({onClick,completed,text}) => {
    return (
        <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
        >
        {text}
        </li>
    );
};

const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {todos.map(todo => 
        <Todo 
            key={todo.id}
            {...todo}
            onClick={() => onTodoClick(todo.id)}
        />)}
    </ul>
);
const mapStateToTodoListProps = (state) => {
    console.log(state.todos.present);
    return {
        todos: getVisibleTodos(state.todos.present, state.visibilityFilter)
    }
};
const mapDispatchToTodoListProps = (dispatch) =>{
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id))
        }
    };
};
const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);

let AddTodo = ({ dispatch }) => {
    let input;
    return(
        <div>
            <input ref={node => {
                    input = node;
                }}
                onKeyUp={(e) => {
                    if(e.keyCode === 13){
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
AddTodo = connect()(AddTodo);

const Footer = () => (
    <p>
    {' '}
    <FilterLink 
        filter="SHOW_ALL">
        All
    </FilterLink>
    {' '}
    <FilterLink 
        filter="SHOW_ACTIVE">
        Active
    </FilterLink>
    {' '}
    <FilterLink 
        filter="SHOW_COMPLETED">
        Completed
    </FilterLink>
    {' '}
</p>
);
let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
    <p>
        <button
            onClick={onUndo}
            disabled={!canUndo}
        > 
            Undo 
        </button>
        <button
            onClick={onRedo}
            disabled={!canRedo}
        > 
            Redo 
        </button>
    </p>
);
const mapStateToUndoRedoProps = (state) => {
    console.log(state);
    return {
        canUndo: state.todos.past.length > 0,
        canRedo: state.todos.future.length > 0
    }
};

const mapDispatchToUndoRedoProps = {
    onUndo: UndoActionCreators.undo,
    onRedo: UndoActionCreators.redo
};
UndoRedo = connect(mapStateToUndoRedoProps, mapDispatchToUndoRedoProps)(UndoRedo);
const TodoApp = () => (
    <div>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
        <UndoRedo/>
</div>
);

export default TodoApp;