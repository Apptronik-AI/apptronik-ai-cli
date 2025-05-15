"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown } from "lucide-react"

export function PortfolioOverview() {
  const [timeframe, setTimeframe] = useState("1d")

  const portfolioValue = 124532.87
  const percentChange = 2.3
  const isPositive = percentChange > 0

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm text-gray-400 mb-1">Total Portfolio Value</h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">${portfolioValue.toLocaleString()}</span>
          <motion.span
            className={`ml-2 flex items-center text-sm ${isPositive ? "text-emerald-400" : "text-red-400"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {Math.abs(percentChange)}%
          </motion.span>
        </div>
      </div>

      <div className="flex space-x-2 text-sm">
        {["1d", "1w", "1m", "3m", "1y", "all"].map((time) => (
          <button
            key={time}
            onClick={() => setTimeframe(time)}
            className={`px-3 py-1 rounded-md transition-colors ${
              timeframe === time ? "bg-emerald-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      <div className="h-[150px] bg-gray-800 rounded-md relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400">Portfolio Chart</p>
        </div>

        <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M0,150 L0,100 C20,90 40,110 60,95 C80,80 100,70 120,80 C140,90 160,100 180,85 C200,70 220,60 240,65 C260,70 280,80 300,60 L300,150 Z"
            fill="url(#gradient)"
            strokeWidth="2"
            stroke="rgb(16, 185, 129)"
          />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-400">24h High</p>
          <p className="font-medium">${(portfolioValue * 1.05).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-400">24h Low</p>
          <p className="font-medium">${(portfolioValue * 0.97).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
