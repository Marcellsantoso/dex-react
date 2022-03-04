import { Moralis } from 'moralis';

export const Networks = {
  ETH: {
    name: 'Rinkeby',
    symbol: 'ETH',
    decimal: 18,
    chainId: Moralis.Chains.ETH_RINKBEY,
    image: 'https://opensea.io/static/images/logos/ethereum.png',
    rpcUrl: 'https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    blockExplorer: 'https://rinkey.etherscan.io',
  },
  MATIC: {
    name: 'Mumbai',
    symbol: 'MATIC',
    decimal: 18,
    chainId: Moralis.Chains.POLYGON_MUMBAI,
    image: 'https://opensea.io/static/images/logos/polygon.svg',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    blockExplorer: 'https://mumbai.polygonscan.com',
  },
};

export function getNetworkData(chainId: string) {
  var network = null;
  Object.keys(Networks).map((key) => {
    const keyTyped = key as keyof typeof Networks;
    const item = Networks[keyTyped];
    if (item.chainId === chainId) {
      network = item;
    }
  });

  return network;
};
