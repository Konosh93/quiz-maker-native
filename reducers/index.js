import { combineReducers } from 'redux-immutable';
import auth from './auth';
import device from './device';
import quizes from './quizes';

const rootReducer = combineReducers({
  auth,
  device,
  quizes,
});

export default rootReducer;
