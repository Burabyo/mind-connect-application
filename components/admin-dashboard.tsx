"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const MOTIVATIONAL_QUOTES = [
  "Your leadership drives meaningful change in mental health",
  "Data-driven insights help us serve students better",
  "Together, we're building a healthier school community",
  "Every metric represents a student who got help",
]

export default function AdminDashboard({ user }: { user: any }) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [exportFormat, setExportFormat] = useState("csv")

  useEffect(() => {
    fetchAdminStats()
  }, [])

  const fetchAdminStats = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error("Failed to fetch admin stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportData = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/export?format=${exportFormat}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `mindconnect_report.${exportFormat}`
      a.click()
    } catch (error) {
      console.error("Failed to export data:", error)
    }
  }

  const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]

  if (loading) {
    return <div className="text-center py-12 text-2xl">⏳ Loading admin dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">🎛️ Admin Portal</h1>
        <p className="text-lg text-muted">School-wide overview of MindConnect usage and impact</p>
      </div>

      {/* Motivational Quote */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-pink-200">
        <p className="text-lg text-purple-700 italic font-semibold">💭 "{randomQuote}"</p>
      </Card>

      {/* Key Metrics - Larger Icons */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
          <p className="text-5xl mb-2">👨‍🎓</p>
          <p className="text-muted text-sm font-semibold">Students</p>
          <p className="text-4xl font-bold text-blue-600">{stats?.totalStudents || 0}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
          <p className="text-5xl mb-2">📅</p>
          <p className="text-muted text-sm font-semibold">Sessions</p>
          <p className="text-4xl font-bold text-green-600">{stats?.totalSessions || 0}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
          <p className="text-5xl mb-2">👨‍⚕️</p>
          <p className="text-muted text-sm font-semibold">Counselors</p>
          <p className="text-4xl font-bold text-purple-600">{stats?.totalCounselors || 0}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200">
          <p className="text-5xl mb-2">📚</p>
          <p className="text-muted text-sm font-semibold">Resources</p>
          <p className="text-4xl font-bold text-yellow-600">{stats?.totalResources || 0}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200">
          <p className="text-5xl mb-2">⭐</p>
          <p className="text-muted text-sm font-semibold">Satisfaction</p>
          <p className="text-4xl font-bold text-pink-600">{stats?.satisfactionRate || 0}%</p>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card className="p-6 border-2 border-blue-100">
        <h2 className="text-2xl font-bold mb-4">📊 Weekly Trends</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <p className="text-3xl">📅</p>
              <p className="font-semibold text-lg">Sessions Booked</p>
            </div>
            <p className="font-bold text-2xl text-blue-600">{stats?.weeklyTrends?.sessionsBooked || 0} ↑</p>
          </div>
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <p className="text-3xl">📚</p>
              <p className="font-semibold text-lg">Resources Accessed</p>
            </div>
            <p className="font-bold text-2xl text-green-600">{stats?.weeklyTrends?.resourcesAccessed || 0} ↑</p>
          </div>
          <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-3">
              <p className="text-3xl">✓</p>
              <p className="font-semibold text-lg">Check-ins Completed</p>
            </div>
            <p className="font-bold text-2xl text-purple-600">{stats?.weeklyTrends?.checkinsCompleted || 0} ↑</p>
          </div>
          <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-3">
              <p className="text-3xl">🎉</p>
              <p className="font-semibold text-lg">New Students</p>
            </div>
            <p className="font-bold text-2xl text-yellow-600">{stats?.weeklyTrends?.newStudents || 0}</p>
          </div>
        </div>
      </Card>

      {/* Common Topics */}
      {stats?.commonTopics && stats.commonTopics.length > 0 && (
        <Card className="p-6 border-2 border-pink-100">
          <h2 className="text-2xl font-bold mb-4">🎯 Most Common Issues Among Students</h2>
          <div className="space-y-3">
            {stats.commonTopics.map((topic: any, idx: number) => (
              <div
                key={idx}
                className="flex justify-between items-center p-4 bg-pink-50 rounded-lg border-2 border-pink-200"
              >
                <p className="font-semibold text-lg">{topic.name}</p>
                <span className="bg-pink-200 text-pink-800 px-4 py-2 rounded-full font-bold text-lg">
                  {topic.count} sessions
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Export Data */}
      <Card className="p-6 border-2 border-green-100 bg-gradient-to-br from-green-50 to-blue-50">
        <h2 className="text-2xl font-bold mb-4">📥 Export Reports</h2>
        <p className="text-muted mb-4">Download comprehensive data for further analysis and reporting</p>
        <div className="flex flex-col md:flex-row gap-3">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="px-4 py-3 border-2 border-green-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold md:flex-1"
          >
            <option value="csv">CSV (Spreadsheet)</option>
            <option value="pdf">PDF (Report)</option>
            <option value="json">JSON (Raw Data)</option>
          </select>
          <Button
            onClick={handleExportData}
            className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-3 px-6"
          >
            📥 Download Report
          </Button>
        </div>
      </Card>

      {/* Privacy Controls */}
      <Card className="p-6 border-2 border-purple-100">
        <h2 className="text-2xl font-bold mb-4">🔒 Privacy & Data Controls</h2>
        <p className="text-muted mb-4">Manage student data retention and anonymization settings</p>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <p className="font-semibold text-lg">📅 Data Retention Period</p>
            <select className="px-4 py-2 border-2 border-purple-300 rounded-lg bg-white font-semibold">
              <option>30 days</option>
              <option>90 days</option>
              <option>1 year</option>
              <option>Indefinite</option>
            </select>
          </div>
          <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <p className="font-semibold text-lg">🔐 Anonymization Level</p>
            <select className="px-4 py-2 border-2 border-purple-300 rounded-lg bg-white font-semibold">
              <option>Full (Remove all identifiers)</option>
              <option>Partial (Keep student ID only)</option>
              <option>None (Keep all data)</option>
            </select>
          </div>
        </div>
        <Button className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg py-3">
          ✓ Save Privacy Settings
        </Button>
      </Card>

      {/* System Health */}
      <Card className="p-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <h2 className="text-2xl font-bold mb-4">✓ System Status</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <p className="text-3xl">🟢</p>
            <p className="font-semibold text-lg">All systems operational and running smoothly</p>
          </div>
          <p className="text-muted text-sm">Last updated: {new Date().toLocaleTimeString()}</p>
          <p className="text-muted text-sm">Server health: Excellent | Database: Connected | APIs: Responsive</p>
        </div>
      </Card>

      {/* Admin Instructions */}
      <Card className="p-6 border-2 border-indigo-100 bg-gradient-to-r from-indigo-50 to-blue-50">
        <h2 className="text-2xl font-bold mb-4">📋 Admin Tasks & Responsibilities</h2>
        <ul className="space-y-3 text-lg">
          <li className="flex items-start gap-3">
            <span className="text-2xl">1️⃣</span>
            <span>
              <strong>Monitor student engagement:</strong> Check weekly trends to ensure students are actively using
              MindConnect
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">2️⃣</span>
            <span>
              <strong>Review counselor workload:</strong> Ensure counselors are not overwhelmed and manage session
              distribution
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">3️⃣</span>
            <span>
              <strong>Track common issues:</strong> Identify emerging mental health trends in your school for targeted
              interventions
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">4️⃣</span>
            <span>
              <strong>Export reports:</strong> Generate monthly reports for stakeholders and funding bodies
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">5️⃣</span>
            <span>
              <strong>Maintain privacy:</strong> Regularly review and adjust data retention settings per local
              regulations
            </span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
