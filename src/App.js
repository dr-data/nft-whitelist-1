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

  window.ethereum.on('accountsChanged', () => {
    window.location.reload()
  })

  window.ethereum.on('chainChanged', () => {
    window.location.reload()
  })

  window.ethereum.on('disconnect', () => {
    window.location.reload()
  })

  async function getAccounts() {
    if(typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
      setAccounts(accounts);
      console.log(accounts);
    }
  }



  return (
    <div className="App">
      {loader ? <p>Loading...</p> : 
      !loader &&
        accounts.length > 0 ?
        <p>You are connected with {accounts[0]}</p>
        :
        <p onClick={() => getAccounts()}>Log in with metamask</p>
      
      }
    </div>
  );
}

export default App;
