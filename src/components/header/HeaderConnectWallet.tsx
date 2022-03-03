import ActionButton from '../ActionButton';
import { useSelector, useDispatch } from 'react-redux';
import connectWalletAction from '../../store/actions/connectWalletAction';
import { useState, useEffect, useCallback } from 'react';
import { Moralis } from 'moralis';
import Lottie from 'lottie-react';
import Loading from '../../loading.json';

function HeaderConnectWallet() {
  const [connectedUser, setConnectedUser] = useState(null);
  const [userWalletAddress, setUserWalletAddress] = useState('');
  const [loadingUserBalance, setLoadingUserBalance] = useState(false);
  const [userWalletBalance, setUserWalletBalance] = useState('0');
  const walletState = useSelector((state: any) => state.connectedUser);
  const dispatch = useDispatch();

  function loadData() {
    if (walletState == null) return;
    walletState.then(async (user: any) => {
      if (user == null) return;
      setConnectedUser(user);
      setUserWalletAddress(user.get('ethAddress'));
    });
  }

  const loadUserBalance = useCallback(async () => {
    if (connectedUser == null || userWalletAddress === '') return;

    setLoadingUserBalance(true);
    const balance = await Moralis.Web3API.account.getNativeBalance({ address: userWalletAddress });
    setUserWalletBalance(balance.balance);
    setLoadingUserBalance(false);
  }, [connectedUser, userWalletAddress]);

  useEffect(() => {
    loadData();
  });

  useEffect(() => {
    loadUserBalance();
  }, [loadUserBalance, userWalletAddress]);

  return (
    <div className="bg-zinc-800 rounded-xl shadow-xl w-36 h-12 flex content-center justify-center">
      {connectedUser ? (
        loadingUserBalance ? (
          <Lottie animationData={Loading} />
        ) : (
          <button className="flex-full text-ellipsis overflow-hidden">{userWalletBalance}</button>
        )
      ) : (
        <ActionButton text={'Connect Wallet'} onClick={() => dispatch(connectWalletAction())} />
      )}
    </div>
  );
}

export default HeaderConnectWallet;
