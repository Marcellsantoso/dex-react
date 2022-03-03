import ActionButton from '../ActionButton';
import { useSelector, useDispatch } from 'react-redux';
import connectWalletAction from '../../store/actions/connectWalletAction';
import { useState, useEffect } from 'react';

function HeaderConnectWallet() {
  const [isWalletConnected, setWalletConnected] = useState(false);
  const walletState = useSelector((state: any) => state.isWalletConnected);
  const dispatch = useDispatch();

  function swap() {
    console.log('Swap');
  }

  function loadData() {
    walletState.then((result: boolean) => setWalletConnected(result));
  }

  useEffect(() => {
    loadData();
  });

  if (isWalletConnected) return <></>;
  return (
    <div className="bg-zinc-800 rounded-xl shadow-xl w-36 h-12 flex">
      <ActionButton text={'Connect Wallet'} onClick={() => dispatch(connectWalletAction())} />
    </div>
  );
}

export default HeaderConnectWallet;
