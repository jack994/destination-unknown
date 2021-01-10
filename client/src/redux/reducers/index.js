import { combineReducers } from 'redux';

import flightContextReducer from './flightContext';
import skyscannerReducer from './skyscanner';

export default combineReducers({
  flightContext: flightContextReducer,
  skyscanner: skyscannerReducer,
});
