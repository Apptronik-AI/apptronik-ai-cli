"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Terminal } from "@/components/ui/terminal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioOverview } from "@/components/portfolio-overview"
import { AIStrategySelector } from "@/components/ai-strategy-selector"
import { WalletConnect } from "@/components/wallet-connect"
import { CommandPalette } from "@/components/command-palette"
import { BarChart3, Wallet, Bot, TerminalIcon, ArrowUpRight } from "lucide-react"

export default function Home() {
  const [connected, setConnected] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to Apptronik AI CLI v1.0.0",
    "Type 'help' to see available commands",
  ])

  const handleCommand = (command: string) => {
    setTerminalHistory((prev) => [...prev, `> ${command}`])

    // Process commands
    if (command === "help") {
      setTerminalHistory((prev) => [
        ...prev,
        "Available commands:",
        "  connect - Connect your wallet",
        "  portfolio - Show portfolio overview",
        "  strategy - Configure AI strategy",
        "  optimize - Run portfolio optimization",
        "  history - Show transaction history",
        "  settings - Configure settings",
        "  clear - Clear terminal",
        "  exit - Close terminal",
      ])
    } else if (command === "connect") {
      setTerminalHistory((prev) => [...prev, "Connecting wallet..."])
      setTimeout(() => {
        setConnected(true)
        setTerminalHistory((prev) => [...prev, "Wallet connected successfully!"])
      }, 1500)
    } else if (command === "portfolio") {
      setTerminalHistory((prev) => [...prev, "Loading portfolio data..."])
      setTimeout(() => {
        setTerminalHistory((prev) => [
          ...prev,
          "Portfolio Value: $124,532.87",
          "24h Change: +2.3%",
          "Assets: BTC, ETH, SOL, AVAX, MATIC",
        ])
      }, 1000)
    } else if (command === "clear") {
      setTerminalHistory(["Terminal cleared"])
    } else if (command === "exit") {
      setTerminalOpen(false)
    } else {
      setTerminalHistory((prev) => [...prev, `Command not recognized: ${command}`])
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold">Apptronik AI</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setTerminalOpen(!terminalOpen)}>
              <TerminalIcon className="h-5 w-5" />
            </Button>
            <WalletConnect connected={connected} onConnect={() => setConnected(true)} />
          </div>
        </motion.div>

        {!connected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center h-[70vh]"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Wallet className="h-24 w-24 mb-6 text-emerald-400" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-8 text-center max-w-md">
              Connect your wallet to start managing your crypto assets with our AI-powered platform
            </p>
            <Button size="lg" onClick={() => setConnected(true)} className="bg-emerald-500 hover:bg-emerald-600">
              Connect Wallet
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="ai-strategy">AI Strategy</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5 text-emerald-400" />
                        Portfolio Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PortfolioOverview />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bot className="mr-2 h-5 w-5 text-emerald-400" />
                        AI Strategy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AIStrategySelector />
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex justify-between items-center border-b border-gray-800 pb-3">
                            <div>
                              <p className="font-medium">
                                {i === 1 ? "BTC Purchase" : i === 2 ? "ETH Swap" : "SOL Sale"}
                              </p>
                              <p className="text-sm text-gray-400">
                                {i === 1 ? "May 15, 2025" : i === 2 ? "May 14, 2025" : "May 12, 2025"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`font-medium ${i === 3 ? "text-red-400" : "text-emerald-400"}`}>
                                {i === 1 ? "+0.05 BTC" : i === 2 ? "+2.5 ETH" : "-10.2 SOL"}
                              </p>
                              <p className="text-sm text-gray-400">
                                {i === 1 ? "$3,245.67" : i === 2 ? "$5,678.23" : "$1,234.56"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="portfolio">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Portfolio Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-gray-800 rounded-md">
                        <p className="text-gray-400">Portfolio Chart Visualization</p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["Bitcoin", "Ethereum", "Solana", "Avalanche", "Polygon"].map((coin, i) => (
                      <Card key={i}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{coin}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-2xl font-bold">${(Math.random() * 10000).toFixed(2)}</p>
                              <p className={`text-sm ${Math.random() > 0.5 ? "text-emerald-400" : "text-red-400"}`}>
                                {Math.random() > 0.5 ? "+" : "-"}
                                {(Math.random() * 10).toFixed(2)}%
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                              Trade
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="ai-strategy">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>AI Strategy Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AIStrategySelector detailed />
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="settings">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Account</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <p>Connected Wallet</p>
                              <p className="text-sm text-gray-400">0x1a2b...3c4d</p>
                            </div>
                            <div className="flex justify-between items-center">
                              <p>Subscription Plan</p>
                              <p className="text-emerald-400">Premium</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-2">Notifications</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <p>Email Alerts</p>
                              <Button variant="outline" size="sm">
                                Enabled
                              </Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <p>Price Alerts</p>
                              <Button variant="outline" size="sm">
                                Enabled
                              </Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <p>Transaction Notifications</p>
                              <Button variant="outline" size="sm">
                                Enabled
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-2">Security</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <p>Two-Factor Authentication</p>
                              <Button variant="outline" size="sm">
                                Enable
                              </Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <p>Transaction Signing</p>
                              <Button variant="outline" size="sm">
                                Required
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <Terminal history={terminalHistory} onCommand={handleCommand} onClose={() => setTerminalOpen(false)} />
          </motion.div>
        )}

        <CommandPalette />
      </div>
    </main>
  )
}
