import { ethers } from "ethers"

export type WalletProvider = {
  provider: ethers.providers.Web3Provider
  signer: ethers.Signer
  address: string
}

export async function connectWallet(): Promise<WalletProvider | null> {
  if (typeof window === "undefined" || !window.ethereum) {
    console.error("No Ethereum provider found. Please install MetaMask or another wallet.")
    return null
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const address = await signer.getAddress()

    return { provider, signer, address }
  } catch (error) {
    console.error("Error connecting to wallet:", error)
    return null
  }
}

export async function getTokenBalance(
  tokenAddress: string,
  walletAddress: string,
  provider: ethers.providers.Provider,
): Promise<string> {
  const abi = ["function balanceOf(address) view returns (uint256)"]
  const contract = new ethers.Contract(tokenAddress, abi, provider)

  try {
    const balance = await contract.balanceOf(walletAddress)
    return ethers.utils.formatUnits(balance, 18) // Assuming 18 decimals
  } catch (error) {
    console.error("Error fetching token balance:", error)
    return "0"
  }
}

export async function getEthBalance(walletAddress: string, provider: ethers.providers.Provider): Promise<string> {
  try {
    const balance = await provider.getBalance(walletAddress)
    return ethers.utils.formatEther(balance)
  } catch (error) {
    console.error("Error fetching ETH balance:", error)
    return "0"
  }
}

export async function sendTransaction(
  signer: ethers.Signer,
  toAddress: string,
  amount: string,
): Promise<ethers.providers.TransactionResponse | null> {
  try {
    const tx = await signer.sendTransaction({
      to: toAddress,
      value: ethers.utils.parseEther(amount),
    })

    return tx
  } catch (error) {
    console.error("Error sending transaction:", error)
    return null
  }
}

export async function swapTokens(
  signer: ethers.Signer,
  routerAddress: string,
  tokenInAddress: string,
  tokenOutAddress: string,
  amountIn: string,
  minAmountOut: string,
  deadline: number,
): Promise<ethers.providers.TransactionResponse | null> {
  // This is a simplified example. In a real application, you would need to:
  // 1. Approve the router to spend tokenIn
  // 2. Call the swap function on the router

  const routerAbi = [
    "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
  ]

  const router = new ethers.Contract(routerAddress, routerAbi, signer)

  try {
    const path = [tokenInAddress, tokenOutAddress]
    const tx = await router.swapExactTokensForTokens(
      ethers.utils.parseUnits(amountIn, 18),
      ethers.utils.parseUnits(minAmountOut, 18),
      path,
      await signer.getAddress(),
      deadline,
    )

    return tx
  } catch (error) {
    console.error("Error swapping tokens:", error)
    return null
  }
}

export function subscribeToEvents(provider: ethers.providers.Web3Provider, callback: (event: any) => void): () => void {
  const filter = {
    address: null, // Listen to all addresses
    topics: [],
  }

  provider.on(filter, callback)

  return () => {
    provider.off(filter, callback)
  }
}
