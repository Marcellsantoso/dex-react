import { Moralis } from 'moralis';

const connectWalletReducer = async (state: any, action: any) => {
  switch (action.type) {
    case 'CONNECT_WALLET':
      try {
        const result = await Moralis.authenticate({ signingMessage: 'Moralis auth login' });
        return result;
      } catch (e) {
        return false;
      }
    default:
      return null;
  }
};

export default connectWalletReducer;
