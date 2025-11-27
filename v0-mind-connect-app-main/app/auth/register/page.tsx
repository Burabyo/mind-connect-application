"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    school: "",
    role: "student", // Added role field with default value
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Now sends the selected role
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("role", data.user.role) // Store role for easy access
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background px-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Create Account</h2>
          <p className="text-muted mb-6">Join MindConnect and start your wellness journey</p>

          {error && (
            <div className="bg-danger/10 border border-danger text-danger px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Account Type</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="student">Student</option>
                <option value="counselor">Counselor</option>
                <option value="admin">School Administrator</option>
              </select>
            </div>

            {/* Student-specific fields */}
            {formData.role === "student" && (
              <>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  name="school"
                  placeholder="School Name (Optional)"
                  value={formData.school}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </>
            )}

            {/* Counselor-specific fields */}
            {formData.role === "counselor" && (
              <input
                type="text"
                placeholder="School Name"
                defaultValue={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-muted">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
