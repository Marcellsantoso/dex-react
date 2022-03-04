import ActionButton from "../ActionButton";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { Moralis } from "moralis";
import Lottie from "lottie-react";
import Loading from "../../loading.json";
import { RootState } from "../../store/store";
import { connect } from "../../store/slice/userSlice";
import { readableBalance } from "utils/Converter";

function HeaderConnectWallet() {
  // const [connectedUser, setConnectedUser] = useState(null);

  const balance = useSelector((state: RootState) => state.user.balance);
  const address = useSelector((state: RootState) => state.user.address);
  const network = useSelector((state: RootState) => state.network);
  const connectedUser = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();


  // console.log(Moralis.Units.Token(balance, network.value.decimal));
  return (
    <div className="bg-zinc-800 rounded-xl shadow-xl w-36 h-12 flex content-center justify-center">
      {connectedUser ? (
        <button className="flex-full text-ellipsis overflow-hidden">
          {readableBalance(balance, network.value.decimal)} <span className="text-xs font-bold">{network.value.symbol}</span>
        </button>
      ) : (
        <ActionButton
          text={"Connect Wallet"}
          onClick={() => dispatch(connect())}
        />
      )}
    </div>
  );
}

export default HeaderConnectWallet;
