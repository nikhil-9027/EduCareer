import { type NextRequest, NextResponse } from "next/server"

// Mock user database - in a real app, this would be a proper database
const users = [
  {
    id: 1,
    username: "demo",
    email: "demo@example.com",
    password: "password123",
    profile: {
      name: "Demo User",
      bio: "Learning enthusiast",
      skills: ["JavaScript", "React", "Node.js"],
    },
  },
]

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json()

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email || u.username === username)

    if (existingUser) {
      return NextResponse.json({ msg: "User already exists" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password, // In real app, this would be hashed
      profile: {
        name: username,
        bio: "",
        skills: [],
      },
    }

    users.push(newUser)

    return NextResponse.json({
      msg: "User created successfully",
    })
  } catch (error) {
    return NextResponse.json({ msg: "Server error" }, { status: 500 })
  }
}
