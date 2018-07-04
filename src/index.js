import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import { render } from 'react-dom';
import TodoApp from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';


// visibility filter reducer
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch(action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;

        default:
            return state;
    }
};

// TODOs reducer
const todo = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };

        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            }

        default:
            return state;
    }
}

const todos = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];

        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));

        default:
            return state;
    }
};

// common reducer
const todoAppReducer = combineReducers({
    todos,
    visibilityFilter
});


// View layer implementation
//
//
//
const store = createStore(todoAppReducer);


render(<Provider store={store}><TodoApp /></Provider>, document.getElementById('root'));

registerServiceWorker();
