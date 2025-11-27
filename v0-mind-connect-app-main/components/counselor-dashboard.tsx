"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const MOTIVATIONAL_QUOTES = [
  "Your compassion makes a real difference in students' lives",
  "Every session is an opportunity to help someone heal",
  "Thank you for being a beacon of hope and support",
  "Your work builds a stronger, healthier community",
]

export default function CounselorDashboard({ user }: { user: any }) {
  const [sessions, setSessions] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [sessionNotes, setSessionNotes] = useState("")
  const [savingNotes, setSavingNotes] = useState(false)
  const [sessionStatus, setSessionStatus] = useState("pending")

  useEffect(() => {
    fetchSessions()
    fetchAnalytics()
  }, [])

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/counselor-sessions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setSessions(Array.isArray(data) ? data : data.sessions || [])
    } catch (error) {
      console.error("Failed to fetch sessions:", error)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setAnalytics(data)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    }
  }

  const handleSaveNotes = async () => {
    if (!selectedSession) return
    setSavingNotes(true)
    try {
      const token = localStorage.getItem("token")
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/${selectedSession.id}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notes: sessionNotes, status: sessionStatus }),
      })
      alert("✓ Notes saved successfully!")
      setSelectedSession({ ...selectedSession, notes: sessionNotes, status: sessionStatus })
    } catch (error) {
      console.error("Failed to save notes:", error)
    } finally {
      setSavingNotes(false)
    }
  }

  const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">👨‍⚕️ Counselor Dashboard</h1>
        <p className="text-lg text-muted">Welcome, {user.name}. You're making a real difference today.</p>
      </div>

      {/* Motivational Quote */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200">
        <p className="text-lg text-purple-700 italic font-semibold">💭 "{randomQuote}"</p>
      </Card>

      {/* Stats - Larger Icons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
          <p className="text-5xl mb-2">📊</p>
          <p className="text-muted text-sm font-semibold">Total Sessions</p>
          <p className="text-4xl font-bold text-blue-600">{analytics?.totalSessions || sessions.length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
          <p className="text-5xl mb-2">✓</p>
          <p className="text-muted text-sm font-semibold">Completed</p>
          <p className="text-4xl font-bold text-green-600">{sessions.filter((s) => s.status === "completed").length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200">
          <p className="text-5xl mb-2">⏳</p>
          <p className="text-muted text-sm font-semibold">Pending</p>
          <p className="text-4xl font-bold text-yellow-600">{sessions.filter((s) => s.status === "pending").length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200">
          <p className="text-5xl mb-2">🆘</p>
          <p className="text-muted text-sm font-semibold">High Risk</p>
          <p className="text-4xl font-bold text-pink-600">{analytics?.highRiskCount || 0}</p>
        </Card>
      </div>

      {/* Sessions List */}
      <Card className="p-6 border-2 border-blue-100">
        <h2 className="text-2xl font-bold mb-4">📋 Your Sessions</h2>
        <p className="text-muted mb-4">Click on any session to view details and add notes</p>
        <div className="space-y-3">
          {sessions.length === 0 ? (
            <p className="text-muted text-center py-8 bg-blue-50 rounded-lg">
              No sessions scheduled. Students will book sessions soon! 🌟
            </p>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="p-4 border-2 border-blue-100 rounded-lg hover:bg-blue-50 cursor-pointer transition-all"
                onClick={() => {
                  setSelectedSession(session)
                  setSessionNotes(session.notes || "")
                  setSessionStatus(session.status || "pending")
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-bold text-lg">👤 {session.student_name || `Student ${session.student_id}`}</p>
                    <p className="text-sm text-muted">
                      📅 {new Date(session.scheduled_date).toLocaleDateString()} at ⏰ {session.scheduled_time}
                    </p>
                    {session.topic && <p className="text-sm text-muted">💭 Topic: {session.topic}</p>}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      session.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : session.status === "in-progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {session.status || "pending"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Selected Session Details */}
      {selectedSession && (
        <Card className="p-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
          <h3 className="text-2xl font-bold mb-4">📝 Session Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-foreground mb-2">👤 Student</label>
                <p className="text-muted text-lg">
                  {selectedSession.student_name || `Student ${selectedSession.student_id}`}
                </p>
              </div>
              <div>
                <label className="block font-semibold text-foreground mb-2">📅 Scheduled Date</label>
                <p className="text-muted text-lg">{new Date(selectedSession.scheduled_date).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-foreground mb-2">💭 Topic</label>
              <p className="text-muted text-lg">{selectedSession.topic || "Not specified"}</p>
            </div>
            <div>
              <label className="block font-semibold text-foreground mb-2">⏳ Session Status</label>
              <select
                value={sessionStatus}
                onChange={(e) => setSessionStatus(e.target.value)}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-foreground mb-2">📝 Session Notes</label>
              <textarea
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 h-32 font-medium"
                placeholder="Add detailed session notes, observations, and recommendations..."
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-3"
              >
                {savingNotes ? "Saving..." : "✓ Save Notes & Status"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedSession(null)}
                className="flex-1 font-bold text-lg py-3"
              >
                Close
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Common Issues */}
      {analytics?.commonIssues && analytics.commonIssues.length > 0 && (
        <Card className="p-6 border-2 border-purple-100">
          <h2 className="text-2xl font-bold mb-4">🎯 Common Topics This Week</h2>
          <div className="space-y-3">
            {analytics.commonIssues.map((issue: any, idx: number) => (
              <div
                key={idx}
                className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200"
              >
                <p className="font-semibold text-lg">{issue.topic}</p>
                <span className="bg-purple-200 text-purple-800 px-4 py-2 rounded-full font-bold text-lg">
                  {issue.count} sessions
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Quick Help Section */}
      <Card className="p-6 border-2 border-indigo-100 bg-gradient-to-r from-indigo-50 to-blue-50">
        <h2 className="text-2xl font-bold mb-4">ℹ️ Tips for Success</h2>
        <ul className="space-y-2 text-lg">
          <li className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <span>Take detailed notes during sessions for better follow-up care</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-2xl">🚨</span>
            <span>Flag high-risk cases immediately and inform administration</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <span>Review analytics regularly to identify common issues</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-2xl">🤝</span>
            <span>Collaborate with other counselors and admin on student referrals</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
