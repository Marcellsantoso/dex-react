import { combineReducers } from 'redux';
import connectWalletReducer from './connectWalletReducer';
import selectNetworkReducer from "./selectNetworkReducer";

const allReducers = combineReducers({
  connectedUser: connectWalletReducer,
  selectedNetwork: selectNetworkReducer,
});

export default allReducers;
