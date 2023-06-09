import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { WalletHandler } from "jackal.js";
import ChainConfig from "./data/chainInfo";
import QrCode from "./QrCode";
import "./styles.css"; //line 6-7 for qr code
import { Link } from "react-router-dom"; //Jacky

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [addr, setAddr] = useState();

  useEffect(() => {
    const newRun = async () => {
      const walletConfig = {
        selectedWallet: "keplr",
        signerChain: "jackal-1",
        enabledChains: ["jackal-1"],
        queryAddr: "https://grpc.jackalprotocol.com",
        txAddr: "https://rpc.jackalprotocol.com",
        chainConfig: ChainConfig,
      };

      const wallet = await WalletHandler.trackWallet(walletConfig);

      const address = wallet.getJackalAddress();

      setAddr(address);
    };
    newRun();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="App">
        <Navbar />

        <header className="App-header">
          <p>Please Scan your Barcode</p>
        </header>
      </div>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Link to="/profile">Go to Profile</Link>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <QrCode value={addr} />
      <Footer />
    </>
  );
}

export default App;
