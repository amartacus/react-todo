// Todoapp
import React from 'react';
import { connect } from 'react-redux';
import {setVisibilityFilter} from './actions';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import AddTodo from './containers/AddTodo';
import VisibleTodoList from './containers/VisibleTodoList';

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