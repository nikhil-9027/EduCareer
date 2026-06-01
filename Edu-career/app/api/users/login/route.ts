import { type NextRequest, NextResponse } from "next/server"

// Mock user database - in a real app, this would be a proper database
const users = [
  {
    id: 1,
    username: "demo",
    email: "demo@example.com",
    password: "password123", // In real app, this would be hashed
    profile: {
      name: "Demo User",
      bio: "Learning enthusiast",
      skills: ["JavaScript", "React", "Node.js"],
    },
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user by email
    const user = users.find((u) => u.email === email)

    if (!user || user.password !== password) {
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      msg: "Login successful",
    })
  } catch (error) {
    return NextResponse.json({ msg: "Server error" }, { status: 500 })
  }
}
