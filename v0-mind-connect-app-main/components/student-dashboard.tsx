"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SessionBooking from "@/components/features/session-booking"
import MoodTracker from "@/components/features/mood-tracker"
import ResourceLibrary from "@/components/features/resource-library"
import Testimonies from "@/components/features/testimonies"
import VictoryTracker from "@/components/features/victory-tracker"
import ExercisesHub from "@/components/features/exercises-hub"
import AnonymousChat from "@/components/features/anonymous-chat"

export default function StudentDashboard({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("home")

  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "mood", label: "Mood Check-in", icon: "😊" },
    { id: "book-session", label: "Book Session", icon: "📅" },
    { id: "chat", label: "Anonymous Chat", icon: "💬" },
    { id: "exercises", label: "Exercises", icon: "🧘" },
    { id: "resources", label: "Resources", icon: "📚" },
    { id: "victories", label: "Victories", icon: "🏆" },
    { id: "testimonies", label: "Testimonies", icon: "✨" },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="text-3xl mb-2">🎯</div>
          <p className="text-muted text-sm">Quick Start</p>
          <p className="font-bold text-lg">Welcome Back</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5">
          <div className="text-3xl mb-2">🎬</div>
          <p className="text-muted text-sm">Get Support</p>
          <p className="font-bold text-lg">Start Here</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="text-3xl mb-2">📖</div>
          <p className="text-muted text-sm">Learn</p>
          <p className="font-bold text-lg">Resources</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-warning/10 to-warning/5">
          <div className="text-3xl mb-2">💪</div>
          <p className="text-muted text-sm">Track</p>
          <p className="font-bold text-lg">Progress</p>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-background text-foreground border border-border hover:bg-border/50"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-surface border border-border rounded-lg p-6">
        {activeTab === "home" && <HomeTab />}
        {activeTab === "mood" && <MoodTracker />}
        {activeTab === "book-session" && <SessionBooking />}
        {activeTab === "chat" && <AnonymousChat />}
        {activeTab === "exercises" && <ExercisesHub />}
        {activeTab === "resources" && <ResourceLibrary />}
        {activeTab === "victories" && <VictoryTracker />}
        {activeTab === "testimonies" && <Testimonies />}
      </div>
    </div>
  )
}

function HomeTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Welcome to MindConnect</h2>
        <p className="text-muted">Your safe space for mental health support and personal growth</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-lg mb-2">📅 Book a Session</h3>
          <p className="text-muted text-sm mb-4">Connect with a qualified counselor today</p>
          <Button size="sm">Book Now</Button>
        </Card>

        <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-lg mb-2">😊 How are you feeling?</h3>
          <p className="text-muted text-sm mb-4">Track your mood and emotional wellbeing</p>
          <Button size="sm">Check In</Button>
        </Card>

        <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-lg mb-2">💬 Need to Talk?</h3>
          <p className="text-muted text-sm mb-4">Start an anonymous chat with a counselor</p>
          <Button size="sm">Chat Now</Button>
        </Card>

        <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-lg mb-2">📚 Explore Resources</h3>
          <p className="text-muted text-sm mb-4">Find articles, books, and wellness tips</p>
          <Button size="sm">Explore</Button>
        </Card>
      </div>

      <Card className="p-6 bg-primary/10 border-primary">
        <h3 className="font-bold text-lg mb-2">💡 Did You Know?</h3>
        <p className="text-muted">
          Regular mood tracking helps identify patterns and improve emotional awareness. Start tracking today!
        </p>
      </Card>
    </div>
  )
}
