import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import TodoApp from './TodoApp';
import { createStore, combineReducers } from  'redux';
import { Provider } from 'react-redux';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

// Reducers
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            if(state.id !== action.id){
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch(action.type){
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(e => todo(e, action));
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
    todos,
    visibilityFilter
});
const persistedState = loadState();
const store = createStore(todoApp, persistedState);

store.subscribe(throttle(() => {
    saveState({
        todos: store.getState().todos
    });
    console.log('State:');
    console.log(store.getState());
    console.log('-----------------')
}, 1000));
ReactDOM.render(
<Provider store={store}>
    <App>
        <TodoApp />
    </App>
</Provider>, document.getElementById('root'));
registerServiceWorker();