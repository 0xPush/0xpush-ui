import { TransactionReceipt } from "ethers";
import { ethers } from "ethers";

export async function sendMaxEther(
  provider: ethers.JsonRpcProvider,
  privateKey: string,
  toAddress: string
): Promise<TransactionReceipt | null> {
  try {
    // Connect to Ethereum network
    const wallet = new ethers.Wallet(privateKey, provider);

    // Get the balance of the wallet
    const balance = await provider.getBalance(wallet.address);

    const gasPrice = (await provider.getFeeData()).maxFeePerGas!;

    // Estimate gas limit
    const estimateGas = await wallet.estimateGas({
      to: toAddress,
      value: 0,
    });

    const estimateFee = estimateGas * gasPrice;
    console.log({ estimateGas, gasPrice, estimateFee });

    // Transaction object
    const transaction: ethers.TransactionRequest = {
      to: toAddress,
      //! Should be 10000n
      value: balance - estimateFee * 1000n,
      gasLimit: estimateGas,
      gasPrice: gasPrice,
    };

    console.log({ transaction, estimateFee });

    // Send transaction
    const tx = await wallet.sendTransaction(transaction);
    console.log({ tx });

    const receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.error("Error sending max ether:", error);
    throw error;
  }
}
