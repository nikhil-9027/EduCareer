"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Send, User, Bot, Sparkles } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Message {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: string
  features?: string[]
}

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! 👋 I'm your AI Career Assistant, here to help you navigate your professional journey.\n\nI can assist you with:\n• **Career Planning** - Find the right path for your interests and skills\n• **Skill Development** - Get personalized learning roadmaps\n• **Job Market Insights** - Understand current trends and opportunities\n• **Mentorship Connections** - Connect with industry professionals\n• **Course Recommendations** - Find the best learning resources\n\nWhat would you like to explore today?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      // Call AI API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          userId: user?.id || null,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        const aiResponse: Message = {
          id: Date.now() + 1,
          type: "bot",
          content: data.response,
          timestamp: data.timestamp,
        }
        setMessages((prev) => [...prev, aiResponse])
      } else {
        throw new Error(data.error || "Failed to get response")
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatMessage = (content: string) => {
    // Convert markdown-style formatting to JSX
    const parts = content.split("\n")
    return parts.map((part, index) => {
      if (part.startsWith("• ")) {
        return (
          <div key={index} className="flex items-start space-x-2 my-1">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
            <span className="text-sm">{part.substring(2)}</span>
          </div>
        )
      } else if (part.includes("**")) {
        const boldParts = part.split("**")
        return (
          <div key={index} className="my-1">
            {boldParts.map((boldPart, boldIndex) =>
              boldIndex % 2 === 1 ? (
                <strong key={boldIndex} className="font-semibold text-indigo-300">
                  {boldPart}
                </strong>
              ) : (
                <span key={boldIndex}>{boldPart}</span>
              ),
            )}
          </div>
        )
      } else if (part.trim()) {
        return (
          <div key={index} className="my-1 text-sm">
            {part}
          </div>
        )
      }
      return <div key={index} className="my-1" />
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[600px] z-40">
      <Card className="h-full bg-background/95 backdrop-blur-md border-indigo-500/20 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Career Assistant</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-xs text-white/80">Online • Responds instantly</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white/80 hover:text-white">
              <X className="w-6 h-6" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto h-96">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                    : "bg-gradient-to-r from-cyan-500 to-blue-600"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              <div
                className={`rounded-2xl p-4 max-w-[80%] ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "bg-card border border-indigo-500/20"
                }`}
              >
                <div className="space-y-1">
                  {message.type === "bot" ? (
                    formatMessage(message.content)
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
                <div className={`text-xs mt-2 ${message.type === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-card border border-indigo-500/20 rounded-2xl p-4 max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        <div className="p-4 border-t border-border">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mb-3">
            {["Career roadmap", "Learn programming", "Job opportunities", "Skill assessment"].map((action) => (
              <Badge
                key={action}
                variant="secondary"
                className="cursor-pointer hover:bg-indigo-100 hover:text-indigo-700 transition-colors text-xs"
                onClick={() => setInputValue(action)}
              >
                {action}
              </Badge>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about your career..."
              className="flex-1 bg-muted/50"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              className="bg-gradient-to-r from-indigo-600 to-purple-600"
              disabled={isTyping || !inputValue.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
