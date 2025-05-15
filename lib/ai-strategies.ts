export type AssetAllocation = {
  symbol: string
  name: string
  percentage: number
  type: "crypto" | "stablecoin" | "defi"
}

export type AIStrategy = {
  id: string
  name: string
  description: string
  riskLevel: number // 0-100
  expectedReturn: {
    min: number
    max: number
  }
  rebalancingFrequency: "daily" | "weekly" | "monthly" | "quarterly"
  allocation: AssetAllocation[]
}

export const strategies: Record<string, AIStrategy> = {
  conservative: {
    id: "conservative",
    name: "Conservative",
    description: "Focus on capital preservation with stable growth and lower volatility",
    riskLevel: 25,
    expectedReturn: {
      min: 5,
      max: 15,
    },
    rebalancingFrequency: "monthly",
    allocation: [
      { symbol: "BTC", name: "Bitcoin", percentage: 20, type: "crypto" },
      { symbol: "ETH", name: "Ethereum", percentage: 20, type: "crypto" },
      { symbol: "USDC", name: "USD Coin", percentage: 30, type: "stablecoin" },
      { symbol: "USDT", name: "Tether", percentage: 20, type: "stablecoin" },
      { symbol: "BNB", name: "Binance Coin", percentage: 10, type: "crypto" },
    ],
  },
  balanced: {
    id: "balanced",
    name: "Balanced",
    description: "Balance between growth and stability with moderate risk",
    riskLevel: 50,
    expectedReturn: {
      min: 10,
      max: 25,
    },
    rebalancingFrequency: "weekly",
    allocation: [
      { symbol: "BTC", name: "Bitcoin", percentage: 25, type: "crypto" },
      { symbol: "ETH", name: "Ethereum", percentage: 25, type: "crypto" },
      { symbol: "SOL", name: "Solana", percentage: 10, type: "crypto" },
      { symbol: "USDC", name: "USD Coin", percentage: 15, type: "stablecoin" },
      { symbol: "AAVE", name: "Aave", percentage: 10, type: "defi" },
      { symbol: "UNI", name: "Uniswap", percentage: 10, type: "defi" },
      { symbol: "LINK", name: "Chainlink", percentage: 5, type: "crypto" },
    ],
  },
  aggressive: {
    id: "aggressive",
    name: "Aggressive",
    description: "Focus on high growth potential with higher volatility",
    riskLevel: 80,
    expectedReturn: {
      min: 20,
      max: 50,
    },
    rebalancingFrequency: "weekly",
    allocation: [
      { symbol: "BTC", name: "Bitcoin", percentage: 20, type: "crypto" },
      { symbol: "ETH", name: "Ethereum", percentage: 20, type: "crypto" },
      { symbol: "SOL", name: "Solana", percentage: 15, type: "crypto" },
      { symbol: "AVAX", name: "Avalanche", percentage: 10, type: "crypto" },
      { symbol: "DOT", name: "Polkadot", percentage: 10, type: "crypto" },
      { symbol: "MATIC", name: "Polygon", percentage: 10, type: "crypto" },
      { symbol: "UNI", name: "Uniswap", percentage: 5, type: "defi" },
      { symbol: "AAVE", name: "Aave", percentage: 5, type: "defi" },
      { symbol: "COMP", name: "Compound", percentage: 5, type: "defi" },
    ],
  },
  "ai-optimized": {
    id: "ai-optimized",
    name: "AI Optimized",
    description: "Dynamic allocation based on AI market analysis and predictions",
    riskLevel: 65,
    expectedReturn: {
      min: 15,
      max: 40,
    },
    rebalancingFrequency: "daily",
    allocation: [
      { symbol: "BTC", name: "Bitcoin", percentage: 22, type: "crypto" },
      { symbol: "ETH", name: "Ethereum", percentage: 22, type: "crypto" },
      { symbol: "SOL", name: "Solana", percentage: 12, type: "crypto" },
      { symbol: "AVAX", name: "Avalanche", percentage: 8, type: "crypto" },
      { symbol: "USDC", name: "USD Coin", percentage: 10, type: "stablecoin" },
      { symbol: "AAVE", name: "Aave", percentage: 8, type: "defi" },
      { symbol: "UNI", name: "Uniswap", percentage: 8, type: "defi" },
      { symbol: "LINK", name: "Chainlink", percentage: 5, type: "crypto" },
      { symbol: "GRT", name: "The Graph", percentage: 5, type: "crypto" },
    ],
  },
}

export function getStrategyById(id: string): AIStrategy | undefined {
  return strategies[id]
}

export function getRecommendedStrategy(
  riskTolerance: number,
  investmentGoals: "growth" | "income" | "preservation",
  timeHorizon: "short" | "medium" | "long",
): string {
  if (riskTolerance < 30) {
    return "conservative"
  } else if (riskTolerance < 60) {
    return "balanced"
  } else if (riskTolerance < 85) {
    return "aggressive"
  } else {
    return "ai-optimized"
  }
}

export function calculateExpectedReturns(strategy: AIStrategy, marketCondition: "bear" | "neutral" | "bull"): number {
  const { min, max } = strategy.expectedReturn

  switch (marketCondition) {
    case "bear":
      return min
    case "neutral":
      return (min + max) / 2
    case "bull":
      return max
    default:
      return (min + max) / 2
  }
}

export function optimizePortfolio(
  currentAllocation: AssetAllocation[],
  targetStrategy: AIStrategy,
  marketTrends: Record<string, { sentiment: number; momentum: number }>,
): AssetAllocation[] {
  // This is a simplified example of portfolio optimization
  // In a real application, this would involve more complex algorithms

  // Start with the target allocation from the strategy
  const optimizedAllocation = [...targetStrategy.allocation]

  // Adjust based on market trends
  for (let i = 0; i < optimizedAllocation.length; i++) {
    const asset = optimizedAllocation[i]
    const trend = marketTrends[asset.symbol]

    if (trend) {
      // Adjust allocation based on sentiment and momentum
      // This is a simplified approach
      const adjustmentFactor = (trend.sentiment + trend.momentum) / 2
      const adjustment = adjustmentFactor * 0.05 // Max 5% adjustment

      // Find assets to reduce to compensate for increases
      if (adjustment > 0) {
        // Find stablecoins or lower performing assets to reduce
        const stablecoins = optimizedAllocation.filter((a) => a.type === "stablecoin")
        if (stablecoins.length > 0) {
          for (const stablecoin of stablecoins) {
            if (stablecoin.percentage > 5) {
              stablecoin.percentage -= adjustment * 100
              asset.percentage += adjustment * 100
              break
            }
          }
        }
      }
    }
  }

  // Ensure total allocation is 100%
  const total = optimizedAllocation.reduce((sum, asset) => sum + asset.percentage, 0)
  if (total !== 100) {
    const factor = 100 / total
    optimizedAllocation.forEach((asset) => {
      asset.percentage *= factor
    })
  }

  return optimizedAllocation
}
