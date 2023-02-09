import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import newsListReducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(newsListReducer, enhancer);
export default store;
