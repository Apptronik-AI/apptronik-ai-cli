#!/usr/bin/env node

import { Command } from "commander"
import chalk from "chalk"
import inquirer from "inquirer"
import ora from "ora"
import { getStrategyById } from "../lib/ai-strategies"
import { connectWallet, getEthBalance, getTokenBalance } from "../lib/blockchain"

const program = new Command()

// CLI version and description
program.name("apptronik-cli").description("Apptronik AI CLI - Manage your crypto assets with AI").version("1.0.0")

// Connect command
program
  .command("connect")
  .description("Connect your wallet")
  .action(async () => {
    const spinner = ora("Connecting to wallet...").start()

    try {
      const wallet = await connectWallet()

      if (wallet) {
        spinner.succeed(`Connected to wallet: ${wallet.address}`)
      } else {
        spinner.fail("Failed to connect wallet")
      }
    } catch (error) {
      spinner.fail(`Error connecting wallet: ${error}`)
    }
  })

// Portfolio command
program
  .command("portfolio")
  .description("Show portfolio overview")
  .action(async () => {
    const spinner = ora("Loading portfolio data...").start()

    try {
      const wallet = await connectWallet()

      if (!wallet) {
        spinner.fail("No wallet connected. Use 'apptronik-cli connect' first.")
        return
      }

      spinner.text = "Fetching balances..."

      // Example tokens - in a real app, these would be fetched from an API
      const tokens = [
        { symbol: "ETH", address: "native", name: "Ethereum" },
        { symbol: "USDC", address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", name: "USD Coin" },
        { symbol: "LINK", address: "0x514910771af9ca656af840dff83e8264ecf986ca", name: "Chainlink" },
      ]

      const balances = []

      // Get ETH balance
      const ethBalance = await getEthBalance(wallet.address, wallet.provider)
      balances.push({
        symbol: "ETH",
        name: "Ethereum",
        balance: ethBalance,
        value: Number.parseFloat(ethBalance) * 3000, // Example price
      })

      // Get token balances
      for (const token of tokens.slice(1)) {
        if (token.address !== "native") {
          const balance = await getTokenBalance(token.address, wallet.address, wallet.provider)
          balances.push({
            symbol: token.symbol,
            name: token.name,
            balance,
            value: Number.parseFloat(balance) * (token.symbol === "USDC" ? 1 : 10), // Example prices
          })
        }
      }

      spinner.stop()

      // Calculate total value
      const totalValue = balances.reduce((sum, token) => sum + token.value, 0)

      console.log("\n" + chalk.bold("Portfolio Overview"))
      console.log(chalk.bold("─".repeat(50)))
      console.log(chalk.bold(`Total Value: $${totalValue.toLocaleString()}`))
      console.log(chalk.bold("─".repeat(50)))

      // Display balances
      console.log(
        chalk.bold("Asset".padEnd(15)) +
          chalk.bold("Balance".padEnd(15)) +
          chalk.bold("Value".padEnd(15)) +
          chalk.bold("Allocation"),
      )

      console.log("─".repeat(50))

      for (const token of balances) {
        const allocation = ((token.value / totalValue) * 100).toFixed(2)
        console.log(
          chalk.cyan(token.symbol.padEnd(15)) +
            token.balance.toString().padEnd(15) +
            `$${token.value.toLocaleString()}`.padEnd(15) +
            `${allocation}%`,
        )
      }

      console.log("─".repeat(50))
    } catch (error) {
      spinner.fail(`Error fetching portfolio: ${error}`)
    }
  })

// Strategy command
program
  .command("strategy")
  .description("Configure AI strategy")
  .action(async () => {
    try {
      const { strategyType } = await inquirer.prompt([
        {
          type: "list",
          name: "strategyType",
          message: "Select an AI strategy:",
          choices: [
            { name: "Conservative - Lower risk, stable growth", value: "conservative" },
            { name: "Balanced - Moderate risk, balanced returns", value: "balanced" },
            { name: "Aggressive - Higher risk, higher potential returns", value: "aggressive" },
            { name: "AI Optimized - Dynamic strategy based on market conditions", value: "ai-optimized" },
          ],
        },
      ])

      const strategy = getStrategyById(strategyType)

      if (!strategy) {
        console.log(chalk.red("Strategy not found"))
        return
      }

      console.log("\n" + chalk.bold(`${strategy.name} Strategy`))
      console.log(chalk.bold("─".repeat(50)))
      console.log(strategy.description)
      console.log(chalk.bold("─".repeat(50)))

      console.log(chalk.bold("Risk Level:"), `${strategy.riskLevel}/100`)
      console.log(chalk.bold("Expected Return:"), `${strategy.expectedReturn.min}% - ${strategy.expectedReturn.max}%`)
      console.log(chalk.bold("Rebalancing:"), strategy.rebalancingFrequency)

      console.log("\n" + chalk.bold("Asset Allocation"))
      console.log(chalk.bold("─".repeat(50)))

      for (const asset of strategy.allocation) {
        console.log(chalk.cyan(asset.symbol.padEnd(8)) + asset.name.padEnd(20) + `${asset.percentage}%`)
      }

      const { confirm } = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: "Apply this strategy to your portfolio?",
          default: false,
        },
      ])

      if (confirm) {
        const spinner = ora("Applying strategy...").start()

        // Simulate strategy application
        await new Promise((resolve) => setTimeout(resolve, 2000))

        spinner.succeed("Strategy applied successfully!")
      }
    } catch (error) {
      console.error(chalk.red(`Error configuring strategy: ${error}`))
    }
  })

// Optimize command
program
  .command("optimize")
  .description("Run portfolio optimization")
  .action(async () => {
    const spinner = ora("Analyzing market conditions...").start()

    try {
      // Simulate market analysis
      await new Promise((resolve) => setTimeout(resolve, 2000))

      spinner.text = "Optimizing portfolio..."

      // Simulate optimization
      await new Promise((resolve) => setTimeout(resolve, 2000))

      spinner.succeed("Portfolio optimization complete!")

      console.log("\n" + chalk.bold("Optimization Results"))
      console.log(chalk.bold("─".repeat(50)))
      console.log(chalk.green("✓"), "Increased allocation to high-performing assets")
      console.log(chalk.green("✓"), "Reduced exposure to underperforming assets")
      console.log(chalk.green("✓"), "Rebalanced for optimal risk-adjusted returns")

      console.log("\n" + chalk.bold("Recommended Actions"))
      console.log(chalk.bold("─".repeat(50)))
      console.log("1.", chalk.cyan("Increase ETH allocation by 5%"))
      console.log("2.", chalk.cyan("Decrease USDC allocation by 3%"))
      console.log("3.", chalk.cyan("Add exposure to SOL (2%)"))

      const { confirm } = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: "Execute these recommendations?",
          default: false,
        },
      ])

      if (confirm) {
        spinner.start("Executing trades...")

        // Simulate trade execution
        await new Promise((resolve) => setTimeout(resolve, 3000))

        spinner.succeed("Trades executed successfully!")
      }
    } catch (error) {
      spinner.fail(`Error optimizing portfolio: ${error}`)
    }
  })

// History command
program
  .command("history")
  .description("Show transaction history")
  .action(async () => {
    const spinner = ora("Fetching transaction history...").start()

    try {
      // Simulate fetching history
      await new Promise((resolve) => setTimeout(resolve, 2000))

      spinner.stop()

      console.log("\n" + chalk.bold("Transaction History"))
      console.log(chalk.bold("─".repeat(70)))

      // Example transactions
      const transactions = [
        { date: "2025-05-15", type: "Buy", asset: "BTC", amount: "0.05", value: "$3,245.67" },
        { date: "2025-05-14", type: "Swap", asset: "ETH", amount: "+2.5", value: "$5,678.23" },
        { date: "2025-05-14", type: "Swap", asset: "USDC", amount: "-5000", value: "$5,000.00" },
        { date: "2025-05-12", type: "Sell", asset: "SOL", amount: "10.2", value: "$1,234.56" },
        { date: "2025-05-10", type: "Buy", asset: "ETH", amount: "1.8", value: "$4,321.09" },
      ]

      console.log(
        chalk.bold("Date".padEnd(12)) +
          chalk.bold("Type".padEnd(8)) +
          chalk.bold("Asset".padEnd(8)) +
          chalk.bold("Amount".padEnd(12)) +
          chalk.bold("Value".padEnd(12)) +
          chalk.bold("Status"),
      )

      console.log("─".repeat(70))

      for (const tx of transactions) {
        console.log(
          tx.date.padEnd(12) +
            (tx.type === "Buy"
              ? chalk.green(tx.type.padEnd(8))
              : tx.type === "Sell"
                ? chalk.red(tx.type.padEnd(8))
                : chalk.blue(tx.type.padEnd(8))) +
            chalk.cyan(tx.asset.padEnd(8)) +
            tx.amount.padEnd(12) +
            tx.value.padEnd(12) +
            chalk.green("Completed"),
        )
      }
    } catch (error) {
      spinner.fail(`Error fetching transaction history: ${error}`)
    }
  })

// Settings command
program
  .command("settings")
  .description("Configure settings")
  .action(async () => {
    try {
      const { setting } = await inquirer.prompt([
        {
          type: "list",
          name: "setting",
          message: "Select a setting to configure:",
          choices: ["Notification Preferences", "Risk Tolerance", "Auto-Rebalancing", "API Keys", "Security Settings"],
        },
      ])

      if (setting === "Notification Preferences") {
        const { notifications } = await inquirer.prompt([
          {
            type: "checkbox",
            name: "notifications",
            message: "Select notification types:",
            choices: [
              { name: "Portfolio Updates", checked: true },
              { name: "Market Alerts", checked: true },
              { name: "Transaction Confirmations", checked: true },
              { name: "Security Alerts", checked: true },
              { name: "Newsletter", checked: false },
            ],
          },
        ])

        console.log(chalk.green("Notification preferences updated!"))
      } else if (setting === "Risk Tolerance") {
        const { riskLevel } = await inquirer.prompt([
          {
            type: "list",
            name: "riskLevel",
            message: "Select your risk tolerance:",
            choices: ["Conservative (Low Risk)", "Moderate (Balanced)", "Aggressive (High Risk)", "Custom"],
          },
        ])

        if (riskLevel === "Custom") {
          const { customRisk } = await inquirer.prompt([
            {
              type: "number",
              name: "customRisk",
              message: "Enter risk level (0-100):",
              validate: (value) => {
                if (value >= 0 && value <= 100) return true
                return "Please enter a number between 0 and 100"
              },
            },
          ])

          console.log(chalk.green(`Risk tolerance set to ${customRisk}!`))
        } else {
          console.log(chalk.green(`Risk tolerance set to ${riskLevel}!`))
        }
      } else if (setting === "Auto-Rebalancing") {
        const { autoRebalance } = await inquirer.prompt([
          {
            type: "confirm",
            name: "autoRebalance",
            message: "Enable automatic portfolio rebalancing?",
            default: true,
          },
        ])

        if (autoRebalance) {
          const { frequency } = await inquirer.prompt([
            {
              type: "list",
              name: "frequency",
              message: "Select rebalancing frequency:",
              choices: ["Daily", "Weekly", "Monthly", "Quarterly"],
            },
          ])

          console.log(chalk.green(`Auto-rebalancing enabled with ${frequency.toLowerCase()} frequency!`))
        } else {
          console.log(chalk.green("Auto-rebalancing disabled!"))
        }
      } else {
        console.log(chalk.yellow("This setting is not yet implemented."))
      }
    } catch (error) {
      console.error(chalk.red(`Error configuring settings: ${error}`))
    }
  })

// Help command
program
  .command("help")
  .description("Display help information")
  .action(() => {
    console.log("\n" + chalk.bold("Apptronik AI CLI Help"))
    console.log(chalk.bold("─".repeat(50)))
    console.log("Apptronik AI helps you manage your crypto assets automatically,")
    console.log("efficiently, and securely. Let our AI engine grow your portfolio")
    console.log("while you focus on what matters.")
    console.log("\n" + chalk.bold("Available Commands:"))
    console.log(chalk.cyan("connect") + "    - Connect your wallet")
    console.log(chalk.cyan("portfolio") + "  - Show portfolio overview")
    console.log(chalk.cyan("strategy") + "   - Configure AI strategy")
    console.log(chalk.cyan("optimize") + "   - Run portfolio optimization")
    console.log(chalk.cyan("history") + "    - Show transaction history")
    console.log(chalk.cyan("settings") + "   - Configure settings")
    console.log(chalk.cyan("help") + "       - Display this help information")
    console.log("\nFor more information, visit: " + chalk.underline("https://apptronik-ai.com"))
  })

// Parse command line arguments
program.parse(process.argv)

// If no arguments, show help
if (process.argv.length === 2) {
  console.log(chalk.bold.green("\n🤖 Welcome to Apptronik AI CLI 🤖\n"))
  program.help()
}
