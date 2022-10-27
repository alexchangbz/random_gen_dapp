import { useState, useEffect } from 'react';
import './App.css';
import { contractAbi, contractAddress } from './lib/constant';
import { ethers } from 'ethers';
import { PropagateLoader } from 'react-spinners'
import Login from './components/Login';

const getRandomContract = () => {
  const { ethereum } = window
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, contractAbi, signer)
  return contract
}

function App() {
  const [currentAccount, setCurrentAccount] = useState()
  const [randomNumber, setRandomNumber] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const connectWallet = async () => {
    const { ethereum } = window
    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setCurrentAccount(accounts[0])
    } else {
      return alert('Please install metamask wallet')
    }
  }

  const generateNumber = async () => {
    setIsLoading(true)
    const result = await getRandomContract().Generate_Number()
    await result.wait()
    initialize()
    setIsLoading(false)
  }

  const initialize = async () => {
    const result = await getRandomContract().rand_num()
    setRandomNumber(result)
  }

  useEffect(() => {
    initialize()
  }, [])
  

  return (
    <div className="App">
      {currentAccount ? (
          <>
            <div className="navbar">
              <p>my wallet address: {currentAccount}</p>
            </div>
            <div className="header">
              <div className="container">
                {isLoading ? (<PropagateLoader color='#000' size={30} />) : (<h1>{randomNumber}</h1>)}
                <button onClick={generateNumber}>Generate Number</button>
              </div>
            </div>
          </>
        ) : (
          <Login connectWallet={connectWallet} />
        )}
      
    </div>
  );
}

export default App;
