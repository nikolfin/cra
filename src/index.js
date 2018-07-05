import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'
import reducer from './reducers/index';
import TodoApp from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = createStore(
    reducer,
    composeWithDevTools()
);


render(<Provider store={store}><TodoApp /></Provider>, document.getElementById('root'));

registerServiceWorker();
