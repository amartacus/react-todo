import { createStore } from  'redux';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';
import todoApp from './reducers';

const configureStore = () => {
	const persistedState = loadState();
	const store = createStore(todoApp, persistedState);

	store.subscribe(throttle(() => {
			saveState({
					todos: store.getState().todos
			});
			console.log('State:');
			console.log(store.getState());
			console.log('-----------------');
	}, 1000));
	return store;
};

export default configureStore;