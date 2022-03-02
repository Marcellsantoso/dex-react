import connectWalletReducer from './connectWalletReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  isWalletConnected: connectWalletReducer,
});

export default allReducers;
