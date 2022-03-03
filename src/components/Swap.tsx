import { AiFillSetting } from 'react-icons/ai';
import { BiDownArrowAlt } from 'react-icons/bi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import ActionButton from './ActionButton';
import { useSelector, useDispatch } from 'react-redux';
import connectWalletAction from '../store/actions/connectWalletAction';
import { useState, useEffect } from 'react';

function Swap() {
  const [connectedUser, setConnectedUser] = useState(null);
  const walletState = useSelector((state: any) => state.connectedUser);
  const dispatch = useDispatch();

  function swap() {
    console.log('Swap');
  }

  function loadData() {
    if (walletState == null) return;
    walletState.then((result: any) => setConnectedUser(result));
  }

  useEffect(() => {
    loadData();
  });

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white dark:bg-black rounded-xl p-6 shadow-2xl min-w-fit w-1/2 text-black dark:text-white">
        <div className="flex">
          <h4 className=" flex-auto">Swap</h4>
          <button>
            <AiFillSetting className="w-5 h-5 text-white hover:text-zinc-300" />
          </button>
        </div>

        <div>
          <div className="flex mt-5">
            <div className="bg-zinc-800 border-transparent hover:border-zinc-600 border flex-auto rounded-xl flex p-4">
              <input
                type="number"
                className="bg-transparent text-2xl font-medium text-neutral-400 focus:outline-none flex-auto"
                placeholder="0.0"
              />

              <button className="w-auto bg-zinc-700 hover:bg-zinc-600 rounded-xl shadow-2xl flex px-4 py-1">
                <div className="text-lg font-medium">ETH</div>
                <MdKeyboardArrowDown className="ml-2 mt-1.5" />
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <BiDownArrowAlt className="bg-zinc-800 h-8 w-8 p-1 rounded-xl border-2 border-black" />
          </div>

          <div className="flex mb-1 mt-2">
            <div className="bg-zinc-800 border-transparent hover:border-zinc-600 border flex-auto rounded-xl flex p-4">
              <input
                type="number"
                className="bg-transparent text-2xl font-medium text-neutral-400 focus:outline-none flex-auto"
                placeholder="0.0"
              />

              <button className="w-auto bg-zinc-700 hover:bg-zinc-600 rounded-xl shadow-2xl flex px-4 py-1">
                <div className="text-lg font-medium">ETH</div>
                <MdKeyboardArrowDown className="ml-2 mt-1.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-2">
          {connectedUser == null ? (
            <ActionButton text={'Connect Wallet'} onClick={() => dispatch(connectWalletAction())} />
          ) : (
            <ActionButton text={'SWAP'} onClick={() => swap()} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Swap;
