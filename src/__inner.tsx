
import { createWeb3Modal, defaultConfig, useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import { BrowserProvider, formatEther, ethers, parseEther } from 'ethers'
import { sendMaxEther } from './eth-utils'


const projectId = '7874a82faa6eab4fe78dc5902b7955d1'

// 2. Set chains
const mainnet = {
  chainId: 168587773,
  name: 'Blast Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://testnet.blastscan.io',
  rpcUrl: 'https://sepolia.blast.io'
}

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata, enableEmail: false, enableCoinbase: false }),
  chains: [mainnet],
  projectId,
  enableAnalytics: false // Optional - defaults to your Cloud configuration
})

const ethersCustomProvider = new ethers.JsonRpcProvider('https://sepolia.blast.io')


import { routeTree } from './routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function AppInner() {
  const { open } = useWeb3Modal()
  const {address, chainId, isConnected} = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  async function getBalance() {
    if (!isConnected) throw Error('User disconnected')

    const ethersProvider = new BrowserProvider(walletProvider!)
    const signer = await ethersProvider.getSigner()
    // The Contract object

    const balance = await ethersProvider.getBalance(signer.address)
    console.log(balance);
    console.log(formatEther(balance));

    const b2 = await ethersProvider.getTransactionCount(signer.address);
    console.log(b2);
  }

  async function send () {
    if (!isConnected) throw Error('User disconnected')

    const ethersProvider = new BrowserProvider(walletProvider!)

    const signer = await ethersProvider.getSigner()
    
    const newWallet = ethers.Wallet.createRandom()
    console.log(newWallet);
    

    const tx = await signer.sendTransaction({
      to: newWallet.address,
      value: parseEther("0.001"),
    })

    const receipt = await tx.wait();
    console.log(receipt);

    // const tx2 = await newWallet.sendTransaction({
    //   to: signer.address,
    //   value: newWallet
    // })
    
    const res = await sendMaxEther(ethersCustomProvider, newWallet.privateKey, signer.address);
    console.log(res);
    

    // ethers.Wallet
    // console.log(newWallet);
    // console.log(new ethers.Wallet(newWallet.privateKey));
    
  }

  async function getFeeData () {
    const data = await ethersCustomProvider.getFeeData();
    console.log(data);
    
  }
}