import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import middlewares from './middlewares';

const mw = applyMiddleware(thunk);
const store = createStore(rootReducer, window.devToolsExtension
  && window.devToolsExtension(), mw);

export default store;
