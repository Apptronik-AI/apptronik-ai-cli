"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Command } from "lucide-react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"

export function CommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 p-3 rounded-full shadow-lg flex items-center justify-center"
        >
          <Command className="h-5 w-5" />
        </motion.button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => console.log("dashboard")}>Dashboard</CommandItem>
            <CommandItem onSelect={() => console.log("portfolio")}>Portfolio</CommandItem>
            <CommandItem onSelect={() => console.log("ai-strategy")}>AI Strategy</CommandItem>
            <CommandItem onSelect={() => console.log("settings")}>Settings</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => console.log("connect-wallet")}>Connect Wallet</CommandItem>
            <CommandItem onSelect={() => console.log("optimize-portfolio")}>Optimize Portfolio</CommandItem>
            <CommandItem onSelect={() => console.log("view-transactions")}>View Transactions</CommandItem>
            <CommandItem onSelect={() => console.log("open-terminal")}>Open Terminal</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
