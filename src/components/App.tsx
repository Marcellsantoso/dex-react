import Header from "./header/Header";
import Swap from "./Swap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Moralis } from "moralis";
import { setUser, getAddress, getBalance } from "../store/slice/userSlice";
import { getNetworkData, } from "store/networks";
import { setNetwork } from "store/slice/networkSlice";
import { RootState } from "store/store";

function App() {
  const address = useSelector((state: RootState) => state.user.address);
  const network = useSelector((state: RootState) => state.network);
  const dispatch = useDispatch();

  useEffect(() => {
    //? Moralis stuff
    const serverUrl = 'https://qrffii1rrdfg.usemoralis.com:2053/server';
    const appId = 'bcqmnDWLXMo7sMrVFnE4XtoZc1nblT05Fy4HZbfY';

    Moralis.start({ serverUrl, appId }).then(async () => {
      checkUserState();
      checkNetwork();

      Moralis.onChainChanged((network) => {
        checkNetwork();
      });
    });
  }, [dispatch]);

  useEffect(() => {
    console.log('dispatch get balance');
    dispatch(getBalance({
      address: address,
      chainId: network.value.chainId,
    }));
  }, [address, network]);

  function checkUserState() {
    const user = Moralis.User.current();
    if (user != null) {
      dispatch(setUser(user));
    }
  }

  async function checkNetwork() {
    await Moralis.enableWeb3();
    const chainId = Moralis.getChainId();
    const network = getNetworkData(chainId);
    if (network != null) {
      dispatch(setNetwork(network));
    }
  }

  return (
    <main className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-screen">
      <Header />
      <Swap />
    </main>
  );
}

export default App;

