import React, { useState } from "react";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard from "@web3-onboard/core";
import logo1 from "../assets/bg.png";
import logo2 from "../assets/headphone.jpeg";

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];

const MAINNET_RPC_URL = "https://polygon-mainnet.g.alchemy.com/v2/odpZQIbE3xtAii8qMNePX-0M6fyB8G0V";
const MUMBAI_RPC_URL = "https://polygon-mumbai.g.alchemy.com/v2/odpZQIbE3xtAii8qMNePX-0M6fyB8G0V";

const onboard = Onboard({
  wallets: modules, // created in previous step
  chains: [
    {
      id: "0x137", // chain ID must be in hexadecimel
      token: "MATIC",
      namespace: "evm",
      label: "Polygon Mainnet",
      rpcUrl: MAINNET_RPC_URL
    },
    {
      id: "0x80001",
      token: "Matic",
      namespace: "evm",
      label: "Mumbai Testnet",
      rpcUrl: MUMBAI_RPC_URL
    },
  ],
  appMetadata: {
    name: "TalentMusica",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    description: "Recycle waste and save our enviroment",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" }
    ]
  }
});

const Welcome = () => {
  const [account, setAccount] = useState();

  const connectWallet2 = async () => {
    try {
      const wallets = await onboard.connectWallet();
      const { accounts, } = wallets[0];
      setAccount(accounts[0].address);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full mf:flex-row flex-col justify-center items-center bg-gray-100">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10 ">
          <h1 className="text-5xl sm:text-7xl text-red-700 font-semibold">
            Talent Musica <br />
          </h1><br />
          <p className="text-left mt-1 text-blue-700 font-light md:w-10/12 w-11/12 text-2xl ">
            Onchain Music Talent Hunt <br />.. Where Blockchain meets New Music Talents
          </p><br />
          <div className="md:flex-[0.8] flex-initial justify-left items-center">

            <img src={logo2} alt="welcome" className="w-100 cursor-pointer" />
          </div>

          <br />
          {/** {!currentAccount && ( )} */}
          <button
            type="button"
            onClick={connectWallet2}
            className="flex flex-row justify-center items-center my-5 bg-red-700 p-3 rounded-full cursor-pointer hover:bg-yellow-500 hover:text-white"
          >

            <p className="text-white text-3xl font-semibold py-1 px-6 mx-14 hover:text-red-700">
              Connect Wallet
            </p>
          </button>

          <div className="text-black text-2xl font-semibold mx-4 my-5 ">
            <div>Connected Wallet Address: <br /> {account}</div>
          </div>

        </div>
      </div>
      <div className="sm:flex-[1.2] lg:flex-[1.9]flex-initial justify-left items-center">

        <img src={logo1} alt="welcome" className=" cursor-pointer" />
      </div>
    </div>
  );
};

export default Welcome;
