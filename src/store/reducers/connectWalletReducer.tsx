import { Moralis } from 'moralis';

const connectWalletReducer = async (state: boolean = false, action: any) => {
  switch (action.type) {
    case 'CONNECT_WALLET':
      try {
        await Moralis.enableWeb3();
        return true;
      } catch (e) {
        return false;
      }
    default:
      return false;
  }
};

export default connectWalletReducer;
