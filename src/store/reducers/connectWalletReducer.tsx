import { Moralis } from 'moralis';

const connectWalletReducer = async (state: any, action: any) => {
  switch (action.type) {
    case 'CONNECT_WALLET':
      const result = await Moralis.authenticate({ signingMessage: 'Moralis auth login' });
      return result;
    default:
      return null;
  }
};

export default connectWalletReducer;
