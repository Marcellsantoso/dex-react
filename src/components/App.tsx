import Header from './header/Header';
import Swap from './Swap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Moralis } from 'moralis';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkUserState() {
      const user = await Moralis.User.current;
      if (user != null) {

      }
    }
  }, []);

  return (
    <main className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-screen">
      <Header />
      <Swap />
    </main>
  );
}

export default App;
