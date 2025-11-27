"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Testimonies() {
  const [posts, setPosts] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: "", content: "", is_anonymous: false })
  const [loading, setLoading] = useState(false)
  const [liked, setLiked] = useState<number[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setFormData({ title: "", content: "", is_anonymous: false })
        setShowForm(false)
        fetchPosts()
      }
    } catch (error) {
      console.error("Failed to create post:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (postId: number) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        setLiked([...liked, postId])
      }
    } catch (error) {
      console.error("Failed to like post:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-2">Testimonies & Inspiration</h2>
          <p className="text-muted">Share your story and inspire others</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? "✕ Cancel" : "✍️ Share Your Story"}</Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Give your story a title..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Your Story</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Share your experience and inspire others..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                rows={6}
                required
              />
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_anonymous}
                onChange={(e) => setFormData({ ...formData, is_anonymous: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="font-medium">Post anonymously</span>
            </label>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Publishing..." : "Publish Testimony"}
            </Button>
          </form>
        </Card>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card className="p-6">
            <p className="text-muted text-center">No testimonies yet. Be the first to share your story!</p>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="p-6">
              <div className="mb-4">
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p className="text-sm text-muted">By {post.is_anonymous ? "Anonymous" : post.author_name}</p>
              </div>

              <p className="text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>

              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <button
                  onClick={() => handleLike(post.id)}
                  disabled={liked.includes(post.id)}
                  className="text-primary font-medium hover:underline disabled:opacity-50"
                >
                  {liked.includes(post.id) ? "❤️ Liked" : "🤍 Like"}
                </button>
                <p className="text-sm text-muted">{new Date(post.created_at).toLocaleDateString()}</p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
