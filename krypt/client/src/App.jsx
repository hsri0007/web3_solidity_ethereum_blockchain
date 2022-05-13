import { useContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TransactionContext } from "./context/TransactionContext";

function App() {
  const { connectWallet, currentAccount, handleChange, handleSubmit } =
    useContext(TransactionContext);

  return (
    <div className="App">
      <h1>{currentAccount}</h1>
      <button onClick={connectWallet}>Connect Wallet</button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input name="addressTo" onChange={handleChange} placeholder="address" />
        <input
          name="amount"
          type="number"
          onChange={handleChange}
          placeholder="parsedAmount"
        />
        <input name="message" onChange={handleChange} placeholder="message" />
        <input name="keyword" onChange={handleChange} placeholder="keyword" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
