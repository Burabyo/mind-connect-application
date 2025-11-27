"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ResourceLibrary() {
  const [resources, setResources] = useState<any[]>([])
  const [savedResources, setSavedResources] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [loading, setLoading] = useState(false)

  const CATEGORIES = ["All", "Psychology", "Exercise", "Book", "Article", "Video"]

  useEffect(() => {
    fetchResources()
    fetchSavedResources()
  }, [selectedCategory])

  const fetchResources = async () => {
    try {
      const url =
        selectedCategory && selectedCategory !== "All"
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/resources?category=${selectedCategory}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/resources`

      const res = await fetch(url)
      const data = await res.json()
      setResources(data)
    } catch (error) {
      console.error("Failed to fetch resources:", error)
    }
  }

  const fetchSavedResources = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources/saved`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setSavedResources(data.map((r) => r.id))
    } catch (error) {
      console.error("Failed to fetch saved resources:", error)
    }
  }

  const handleSaveResource = async (resourceId: number) => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resource_id: resourceId }),
      })

      if (res.ok) {
        setSavedResources([...savedResources, resourceId])
      }
    } catch (error) {
      console.error("Failed to save resource:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Resource Library</h2>
        <p className="text-muted">Discover articles, books, and exercises for your wellbeing</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === "All" ? "" : cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              (cat === "All" && !selectedCategory) || selectedCategory === cat
                ? "bg-primary text-white"
                : "bg-surface border border-border hover:border-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="p-6">
            <div className="mb-4">
              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">{resource.category}</span>
              <span className="text-sm bg-muted/10 text-muted px-2 py-1 rounded ml-2">{resource.type}</span>
            </div>
            <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
            <p className="text-muted text-sm mb-4">{resource.description}</p>

            <div className="flex gap-2">
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button size="sm" className="w-full">
                  View
                </Button>
              </a>
              <Button
                size="sm"
                variant={savedResources.includes(resource.id) ? "default" : "outline"}
                onClick={() => handleSaveResource(resource.id)}
                disabled={loading}
              >
                {savedResources.includes(resource.id) ? "✓ Saved" : "+ Save"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
