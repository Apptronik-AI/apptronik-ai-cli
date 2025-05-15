"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface TerminalProps {
  history: string[]
  onCommand: (command: string) => void
  onClose: () => void
}

export function Terminal({ history, onCommand, onClose }: TerminalProps) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onCommand(input)
      setInput("")
    }
  }

  return (
    <motion.div
      className="bg-gray-900 border border-gray-800 rounded-t-lg shadow-2xl mx-4 md:mx-auto md:max-w-3xl h-80"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <div className="flex items-center justify-between p-2 border-b border-gray-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm text-gray-400">Apptronik AI CLI</div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      <div ref={terminalRef} className="p-4 h-64 overflow-y-auto font-mono text-sm">
        {history.map((line, i) => (
          <div key={i} className="mb-1">
            {line.startsWith(">") ? <div className="text-emerald-400">{line}</div> : <div>{line}</div>}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-emerald-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            autoFocus
          />
        </form>
      </div>
    </motion.div>
  )
}
