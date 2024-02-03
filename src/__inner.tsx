import {
  createWeb3Modal,
  defaultConfig,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { BrowserProvider, formatEther, ethers, parseEther } from "ethers";
import { sendMaxEther } from "./eth-utils";

const ethersCustomProvider = new ethers.JsonRpcProvider(
  "https://sepolia.blast.io"
);

import { routeTree } from "./routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppInner() {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function getBalance() {
    if (!isConnected) throw Error("User disconnected");

    const ethersProvider = new BrowserProvider(walletProvider!);
    const signer = await ethersProvider.getSigner();
    // The Contract object

    const balance = await ethersProvider.getBalance(signer.address);
    console.log(balance);
    console.log(formatEther(balance));

    const b2 = await ethersProvider.getTransactionCount(signer.address);
    console.log(b2);
  }

  async function send() {
    if (!isConnected) throw Error("User disconnected");

    const ethersProvider = new BrowserProvider(walletProvider!);

    const signer = await ethersProvider.getSigner();

    const newWallet = ethers.Wallet.createRandom();
    console.log(newWallet);

    const tx = await signer.sendTransaction({
      to: newWallet.address,
      value: parseEther("0.001"),
    });

    const receipt = await tx.wait();
    console.log(receipt);

    // const tx2 = await newWallet.sendTransaction({
    //   to: signer.address,
    //   value: newWallet
    // })

    const res = await sendMaxEther(
      ethersCustomProvider,
      newWallet.privateKey,
      signer.address
    );
    console.log(res);

    // ethers.Wallet
    // console.log(newWallet);
    // console.log(new ethers.Wallet(newWallet.privateKey));
  }

  async function getFeeData() {
    const data = await ethersCustomProvider.getFeeData();
    console.log(data);
  }
}
