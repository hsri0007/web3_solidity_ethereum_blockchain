import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext({
  connectWallet:()=>{}
});

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [formData, setFormdata] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
  const [transactionCount, setTransactionCount] = useState(null)


 const checkWalletIsConnected=async()=>{
  try {
    if(!ethereum) return alert("please install metamask")

    const accounts = await ethereum.request({method:"eth_accounts"});
 
    if(accounts.length){
     setCurrentAccount(accounts[0])
    }else{
      console.log("no accounts found***")
    }
 
    console.log(accounts)
    
  } catch (error) {
    console.log(error,"no wallet found ***")
  }

 }


 const connectWallet=async()=>{
   try {
    if(!ethereum) return alert("please install metamask");

   const accounts = await ethereum.request({method:'eth_requestAccounts'})

   setCurrentAccount(accounts[0])


   } catch (error) {
     console.log(error,"no wallet found")
   }
 }


 useEffect(()=>{
  checkWalletIsConnected()
 },[])


 const handleChange=(e)=>{

  setFormdata((prev)=>({...prev,[e.target.name]:e.target.value}))

 }
 const handleSubmit=async()=>{


   console.log("triggered")

try {
  if(!ethereum) return alert("please install metamask");
  const { addressTo, amount, keyword, message } = formData;
  console.log( { addressTo, amount, keyword, message })
  const transactionsContract = createEthereumContract();
  const parsedAmount = ethers.utils.parseEther(amount);
  await ethereum.request({
    method: "eth_sendTransaction",
    params: [{
      from: currentAccount,
      to: addressTo,
      gas: "0x5208",
      value: parsedAmount._hex,
    }],
  });

  const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

  await transactionHash.wait();
  console.log(`Success - ${transactionHash.hash}`);

  const transactionsCount = await transactionsContract.getTransactionCount();

  setTransactionCount(transactionsCount.toNumber());

} catch (error) {
  
}
 }



  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, handleChange,handleSubmit }}>
      {children}
    </TransactionContext.Provider>
  );
};
