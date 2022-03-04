import Header from "./header/Header";
import Swap from "./Swap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Moralis } from "moralis";
import { setUser } from "../store/slice/userSlice";
import { getNetworkData, } from "store/networks";
import { setNetwork } from "store/slice/networkSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //? Moralis stuff
    const serverUrl = 'https://qrffii1rrdfg.usemoralis.com:2053/server';
    const appId = 'bcqmnDWLXMo7sMrVFnE4XtoZc1nblT05Fy4HZbfY';

    Moralis.start({ serverUrl, appId }).then(async () => {
      checkUserState();
      checkNetwork();

      Moralis.onChainChanged((network) => { checkNetwork(); });
    });
  }, [dispatch]);

  async function checkUserState() {
    const user = Moralis.User.current();
    if (user != null) {
      dispatch(setUser(user));
    }
  }

  async function checkNetwork() {
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

