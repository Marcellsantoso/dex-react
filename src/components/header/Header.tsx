import { AiFillAliwangwang } from 'react-icons/ai';
import HeaderConnectWallet from './HeaderConnectWallet';
import NetworkSelector from './NetworkSelector';

function Header() {
  return (
    <>
      <div className="flex h-16 mb-6 text-white">
        <div className="h-auto w-full ml-2">
          <AiFillAliwangwang className="h-full w-auto p-3" />
        </div>
        <div className="mr-2">
          <NetworkSelector />
        </div>
        <div className="mr-2">
          <HeaderConnectWallet />
        </div>
      </div>
    </>
  );
}

export default Header;
