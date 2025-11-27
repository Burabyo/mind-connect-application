"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AnonymousChat() {
  const [chatSessions, setChatSessions] = useState<any[]>([])
  const [activeChat, setActiveChat] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [messageInput, setMessageInput] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchChatSessions()
  }, [])

  const fetchChatSessions = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/sessions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setChatSessions(data)
      }
    } catch (error) {
      console.error("Failed to fetch chat sessions:", error)
    }
  }

  const startNewChat = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/start`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        const chat = await res.json()
        setActiveChat(chat)
        setMessages([])
        setChatSessions([...chatSessions, chat])
      }
    } catch (error) {
      console.error("Failed to start chat:", error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chat_id: activeChat.id,
          message: messageInput,
        }),
      })

      if (res.ok) {
        const msg = await res.json()
        setMessages([...messages, msg])
        setMessageInput("")
      }
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Anonymous Chat</h2>
        <p className="text-muted">Talk to a counselor confidentially</p>
      </div>

      <div className="safe-banner">
        ⚠️ This is not an emergency service. For immediate help, please contact emergency services or a crisis helpline.
      </div>

      {!activeChat ? (
        <Card className="p-12 text-center">
          <h3 className="text-xl font-bold mb-4">Start a Confidential Chat</h3>
          <p className="text-muted mb-6">Connect anonymously with a counselor who is ready to listen</p>
          <Button onClick={startNewChat} disabled={loading} size="lg">
            {loading ? "Starting Chat..." : "Start Chat Now"}
          </Button>
        </Card>
      ) : (
        <Card className="p-6 flex flex-col h-96">
          <button onClick={() => setActiveChat(null)} className="text-primary font-medium mb-4">
            ← Back to Chats
          </button>

          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.length === 0 && (
              <p className="text-muted text-center mt-6">A counselor will respond shortly...</p>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender_id === Number.parseInt(localStorage.getItem("userId") || "0") ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender_id === Number.parseInt(localStorage.getItem("userId") || "0")
                      ? "bg-primary text-white"
                      : "bg-surface border border-border"
                  }`}
                >
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" disabled={loading}>
              Send
            </Button>
          </form>
        </Card>
      )}
    </div>
  )
}
