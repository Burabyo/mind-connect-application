"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SessionBooking() {
  const [counselors, setCounselors] = useState<any[]>([])
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [topic, setTopic] = useState("")
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchCounselors()
    fetchSessions()
  }, [])

  const fetchCounselors = async () => {
    try {
      setError("")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/counselors`)
      const data = await res.json()
      const counselorList = Array.isArray(data) ? data : data.counselors || data.data || []
      console.log("[v0] Counselors received:", counselorList)
      setCounselors(counselorList)
    } catch (error) {
      console.error("Failed to fetch counselors:", error)
      setError("Unable to load counselors. Please try again.")
      setCounselors([])
    }
  }

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/my-sessions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      const sessionList = Array.isArray(data) ? data : data.sessions || data.data || []
      setSessions(sessionList)
    } catch (error) {
      console.error("Failed to fetch sessions:", error)
    }
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCounselor || !date || !time) return

    setLoading(true)
    setError("")
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          counselor_id: selectedCounselor,
          date,
          time,
          topic,
        }),
      })

      if (res.ok) {
        setSelectedCounselor(null)
        setDate("")
        setTime("")
        setTopic("")
        fetchSessions()
        alert("🎉 Session booked successfully!")
      } else {
        setError("Failed to book session. Please try again.")
      }
    } catch (error) {
      console.error("Failed to book session:", error)
      setError("An error occurred while booking your session.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">📅 Book a Counseling Session</h2>
        <p className="text-muted">Connect with a counselor who can help you. You're not alone!</p>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100">
        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block font-bold mb-2 text-foreground">Select a Counselor 👨‍⚕️</label>
            {counselors.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
                No counselors available right now. Please try again later.
              </div>
            ) : (
              <select
                value={selectedCounselor || ""}
                onChange={(e) => setSelectedCounselor(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                required
              >
                <option value="">Choose a counselor...</option>
                {counselors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} - {c.specialization || "General Counselor"}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-2 text-foreground">Date 📆</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-foreground">Time ⏰</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-2 text-foreground">What's on your mind? 💭</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g., stress, school pressure, family..."
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            type="submit"
            disabled={loading || counselors.length === 0}
            className="w-full py-3 font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg"
          >
            {loading ? "Booking..." : "✓ Book Session"}
          </Button>
        </form>
      </Card>

      {/* Upcoming Sessions */}
      <Card className="p-6 border-2 border-green-100">
        <h3 className="font-bold mb-4 text-lg">📋 Your Upcoming Sessions</h3>
        <div className="space-y-3">
          {sessions.filter((s) => s.status !== "cancelled").length === 0 ? (
            <p className="text-muted text-center py-4">No upcoming sessions. Book one today! 🌟</p>
          ) : (
            sessions
              .filter((s) => s.status !== "cancelled")
              .map((session) => (
                <div
                  key={session.id}
                  className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg"
                >
                  <div className="flex justify-between mb-2">
                    <p className="font-bold text-lg">{session.counselor_name}</p>
                    <span className="text-sm bg-green-500/20 text-green-700 px-3 py-1 rounded-full font-semibold">
                      {session.status}
                    </span>
                  </div>
                  <p className="text-muted text-sm">
                    📅 {new Date(session.scheduled_date).toLocaleDateString()} at ⏰ {session.scheduled_time}
                  </p>
                  {session.topic && <p className="text-sm text-muted mt-2">💭 {session.topic}</p>}
                </div>
              ))
          )}
        </div>
      </Card>
    </div>
  )
}
