"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Zap, Shield, TrendingUp, BarChart } from "lucide-react"

interface AIStrategySelectorProps {
  detailed?: boolean
}

export function AIStrategySelector({ detailed = false }: AIStrategySelectorProps) {
  const [strategy, setStrategy] = useState("balanced")
  const [riskLevel, setRiskLevel] = useState(50)
  const [autoRebalance, setAutoRebalance] = useState(true)

  const strategies = [
    { id: "conservative", name: "Conservative", icon: Shield, description: "Lower risk, stable growth" },
    { id: "balanced", name: "Balanced", icon: BarChart, description: "Moderate risk, balanced returns" },
    { id: "aggressive", name: "Aggressive", icon: TrendingUp, description: "Higher risk, higher potential returns" },
    { id: "ai-optimized", name: "AI Optimized", icon: Zap, description: "Dynamic strategy based on market conditions" },
  ]

  if (!detailed) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm text-gray-400">Current Strategy</h3>
            <p className="font-medium">{strategies.find((s) => s.id === strategy)?.name || "Balanced"}</p>
          </div>
          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
            Optimize
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Risk Level</span>
            <span>{riskLevel}%</span>
          </div>
          <Slider
            value={[riskLevel]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setRiskLevel(value[0])}
            className="py-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <span className="text-sm">Last rebalance: 2 days ago</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Strategy Selection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strategies.map((s) => (
            <motion.div
              key={s.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStrategy(s.id)}
              className={`cursor-pointer p-4 rounded-lg border ${
                strategy === s.id ? "border-emerald-500 bg-emerald-500/10" : "border-gray-800 hover:border-gray-700"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${strategy === s.id ? "bg-emerald-500/20" : "bg-gray-800"}`}>
                  <s.icon className={`h-5 w-5 ${strategy === s.id ? "text-emerald-400" : "text-gray-400"}`} />
                </div>
                <div>
                  <h4 className="font-medium">{s.name}</h4>
                  <p className="text-sm text-gray-400">{s.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Risk Tolerance</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Conservative</span>
            <span>Aggressive</span>
          </div>
          <Slider
            value={[riskLevel]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setRiskLevel(value[0])}
            className="py-4"
          />
          <div className="text-center text-sm">
            Current Risk Level: <span className="font-medium">{riskLevel}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Asset Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Rebalancing Frequency</label>
            <Select defaultValue="weekly">
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Maximum Asset Allocation</label>
            <Select defaultValue="30">
              <SelectTrigger>
                <SelectValue placeholder="Select maximum %" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20%</SelectItem>
                <SelectItem value="30">30%</SelectItem>
                <SelectItem value="40">40%</SelectItem>
                <SelectItem value="50">50%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Automation</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Automatic Rebalancing</p>
              <p className="text-sm text-gray-400">Automatically rebalance portfolio based on strategy</p>
            </div>
            <Switch checked={autoRebalance} onCheckedChange={setAutoRebalance} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">AI-Driven Adjustments</p>
              <p className="text-sm text-gray-400">Allow AI to make real-time adjustments</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Profit Taking</p>
              <p className="text-sm text-gray-400">Automatically take profits at specified thresholds</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Apply Strategy</Button>
      </div>
    </div>
  )
}
