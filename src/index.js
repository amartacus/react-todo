import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import TodoApp from './TodoApp';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

render(
	<Provider store={store}>
			<App>
					<TodoApp />
			</App>
	</Provider>, 
	document.getElementById('root')
);
registerServiceWorker();