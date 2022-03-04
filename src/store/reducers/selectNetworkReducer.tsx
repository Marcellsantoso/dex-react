import { ActionType } from '../actionType';
import { Moralis } from 'moralis';

const selectNetworkReducer = async (state: any, action: any) => {
  switch (action.type) {
    case ActionType.SELECT_NETWORK:
      try {
        const user = await Moralis.User.current();
        if (user == null) {
          await Moralis.authenticate();
        } else {
          await Moralis.enableWeb3();
        }
        const payload = action.payload;
        try {
          await Moralis.switchNetwork(payload.chainId);
        } catch (e) {
          // User doesnt have network config yet, so add a new one
          await addNetwork(payload);
        }

        return payload;
      } catch (error) {
        // User cancelled
        console.log(error);
        return null;
      }
    default:
      return null;
  }
};

async function addNetwork(payload: any) {
  await Moralis.addNetwork(
    payload.chainId,
    payload.name,
    payload.symbol,
    payload.symbol,
    payload.rpcUrl,
    payload.blockExplorer,
  );
}

export default selectNetworkReducer;
