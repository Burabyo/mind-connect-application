"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function VictoryTracker() {
  const [victories, setVictories] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: "", description: "", category: "general" })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchVictories()
  }, [])

  const fetchVictories = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/victories`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setVictories(data)
    } catch (error) {
      console.error("Failed to fetch victories:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/victories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setFormData({ title: "", description: "", category: "general" })
        setShowForm(false)
        fetchVictories()
      }
    } catch (error) {
      console.error("Failed to create victory:", error)
    } finally {
      setLoading(false)
    }
  }

  const CATEGORIES = ["Academic", "Social", "Health", "Personal", "Family", "Other"]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-2">Victory Tracker</h2>
          <p className="text-muted">Celebrate your achievements and personal wins</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? "✕ Cancel" : "+ New Victory"}</Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Victory Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="What did you accomplish?"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Description (Optional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell us more about this victory..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Saving..." : "Record Victory"}
            </Button>
          </form>
        </Card>
      )}

      {/* Victories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {victories.length === 0 ? (
          <Card className="p-6 col-span-2">
            <p className="text-muted text-center">No victories yet. Start tracking your wins today!</p>
          </Card>
        ) : (
          victories.map((victory) => (
            <Card key={victory.id} className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success">
              <h3 className="font-bold text-lg mb-2">🏆 {victory.title}</h3>
              <p className="text-sm text-muted mb-3 capitalize">{victory.category}</p>
              {victory.description && <p className="text-muted text-sm">{victory.description}</p>}
              <p className="text-xs text-muted mt-4">{new Date(victory.created_at).toLocaleDateString()}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
