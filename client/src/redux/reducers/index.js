import { combineReducers } from 'redux';

import flightContextReducer from './flightContext';

export default combineReducers({
  flightContext: flightContextReducer,
});
