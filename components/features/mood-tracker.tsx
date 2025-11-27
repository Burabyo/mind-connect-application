"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const MOODS = ["Happy", "Sad", "Anxious", "Calm", "Stressed", "Excited", "Tired", "Neutral"]

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [intensity, setIntensity] = useState(5)
  const [notes, setNotes] = useState("")
  const [history, setHistory] = useState<any[]>([])
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchMoodHistory()
  }, [])

  const fetchMoodHistory = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/moods/history`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setHistory(data.moods || [])
      setStreak(data.streak || 0)
    } catch (error) {
      console.error("Failed to fetch mood history:", error)
    }
  }

  const handleSubmit = async () => {
    if (!selectedMood) return

    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/moods/checkin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mood: selectedMood, intensity, notes }),
      })

      if (res.ok) {
        setSelectedMood(null)
        setIntensity(5)
        setNotes("")
        fetchMoodHistory()
      }
    } catch (error) {
      console.error("Failed to submit mood:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Mood Check-in</h2>
        <p className="text-muted">How are you feeling today?</p>
      </div>

      {/* Mood Selection */}
      <Card className="p-6">
        <h3 className="font-bold mb-4">Select Your Mood</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {MOODS.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`p-4 rounded-lg border-2 font-medium transition-all ${
                selectedMood === mood
                  ? "bg-primary text-white border-primary"
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              {mood}
            </button>
          ))}
        </div>

        {selectedMood && (
          <>
            <div className="mb-6">
              <label className="block font-medium mb-2">Intensity: {intensity}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(Number.parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-2">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about your mood..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
            </div>

            <Button onClick={handleSubmit} disabled={loading} className="w-full">
              {loading ? "Saving..." : "Save Mood Check-in"}
            </Button>
          </>
        )}
      </Card>

      {/* Streak */}
      <Card className="p-6 bg-success/10 border-success">
        <h3 className="font-bold mb-2">🔥 Current Streak</h3>
        <p className="text-3xl font-bold text-success mb-2">{streak} Days</p>
        <p className="text-muted">Keep checking in daily to maintain your streak!</p>
      </Card>

      {/* History */}
      <Card className="p-6">
        <h3 className="font-bold mb-4">Recent Check-ins</h3>
        <div className="space-y-3">
          {history.length === 0 ? (
            <p className="text-muted">No mood check-ins yet. Start by selecting a mood above!</p>
          ) : (
            history.slice(0, 5).map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 bg-surface border border-border rounded-lg"
              >
                <div>
                  <p className="font-medium">{item.mood}</p>
                  <p className="text-sm text-muted">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{item.intensity}/10</p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
