import connectWalletReducer from './connectWalletReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  connectedUser: connectWalletReducer,
});

export default allReducers;
