"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (user: any) => void
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const endpoint = isLogin ? "/api/users/login" : "/api/users/register"
      const body = isLogin ? { email: formData.email, password: formData.password } : formData

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (response.ok) {
        if (isLogin) {
          onLogin(data.user)
          onClose()
        } else {
          setIsLogin(true)
          setError("Account created successfully! Please login.")
        }
      } else {
        setError(data.msg || "An error occurred")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-md bg-background shadow-2xl">
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
          <CardTitle className="text-3xl font-bold text-center">{isLogin ? "Login" : "Create Account"}</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            {error && <div className="text-destructive text-sm text-center">{error}</div>}

            <Button
              type="submit"
              className={`w-full ${
                isLogin
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : isLogin ? "Login" : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
                setFormData({ username: "", email: "", password: "" })
              }}
              className="text-indigo-400 hover:underline"
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
