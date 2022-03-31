import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {

  const [loader, setLoader] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState();
  const [succes, setSucces] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setLoader(false);
  }, [])

  window.ethereum.on('disconnect', () => {
    window.location.reload()
  })

  window.ethereum.on('chainChanged', () => {
    window.location.reload()
  })

  async function getAccounts() {
    if(typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
      setAccounts(accounts);
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const balance = await provider.getBalance(accounts[0])
      const balanceInETH = ethers.utils.formatEther(balance)
      setBalance(balanceInETH)
    }
  }

  return (
    <div className="App">
      {!loader &&
        accounts.length > 0 ?
        <div className='login'>
          <p>You are connected with this adress : {accounts[0]}</p>
          <p>You have {balance} ETH on your account.</p>
        </div>
        :
        <div className='hero'>
          <img src='./banner.png'/>
          <button className='connect' onClick={() => getAccounts()}>Log in with Metamask</button>
        </div>
        
      }
    </div>
  );
}

export default App;
