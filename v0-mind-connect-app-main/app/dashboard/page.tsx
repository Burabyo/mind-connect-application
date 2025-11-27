"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import StudentDashboard from "@/components/student-dashboard"
import CounselorDashboard from "@/components/counselor-dashboard"
import AdminDashboard from "@/components/admin-dashboard"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const role = localStorage.getItem("role") // Get role from storage

    if (!userData || !role) {
      router.push("/auth/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("role") // Clear role on logout
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-xl text-foreground mb-4">Loading your dashboard...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">MindConnect</h1>
          <p className="text-sm text-primary-light">
            {user.name} • {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="text-white border-white hover:bg-white/10 bg-transparent"
        >
          Logout
        </Button>
      </nav>

      <main className="p-6">
        {user.role === "student" && <StudentDashboard user={user} />}
        {user.role === "counselor" && <CounselorDashboard user={user} />}
        {user.role === "admin" && <AdminDashboard user={user} />}
      </main>
    </div>
  )
}
