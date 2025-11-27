import Link from "next/link"
import { Button } from "@/components/ui/button"

const MOTIVATIONAL_QUOTES = [
  "Your mental health is a priority, not a luxury",
  "You are stronger than you think. Take care of yourself.",
  "It's okay to not be okay, and it's okay to ask for help.",
  "Small steps lead to big changes in mental wellness",
  "Your feelings are valid. You deserve support.",
]

export default function Home() {
  const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🧠</span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MindConnect
          </h1>
        </div>
        <div className="flex gap-3">
          <Link href="/auth/login">
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center px-6 py-12 gap-8">
        {/* Hero Section */}
        <div className="max-w-3xl text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Your Safe Space for
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mental Wellness
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              MindConnect connects students with counselors, resources, and a supportive community—all in one safe,
              judgment-free space.
            </p>
          </div>

          {/* Motivational Quote */}
          <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-lg">
            <p className="text-lg text-purple-700 italic font-medium">💭 "{randomQuote}"</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-white border-2 border-blue-100 p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-lg text-blue-600 mb-2">Book Sessions</h3>
              <p className="text-sm text-gray-600">Connect with qualified counselors anytime you need support</p>
            </div>
            <div className="bg-white border-2 border-green-100 p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-bold text-lg text-green-600 mb-2">Anonymous Chat</h3>
              <p className="text-sm text-gray-600">
                Talk freely without revealing your identity. We listen without judgment.
              </p>
            </div>
            <div className="bg-white border-2 border-pink-100 p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold text-lg text-pink-600 mb-2">Learn & Grow</h3>
              <p className="text-sm text-gray-600">Access articles, books, videos, and exercises for wellbeing</p>
            </div>
            <div className="bg-white border-2 border-yellow-100 p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold text-lg text-yellow-600 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">Monitor your mood, celebrate victories, and celebrate growth</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/auth/register">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl"
            >
              Start Your Journey Today 🚀
            </Button>
          </Link>
        </div>

        {/* Bottom Section - Why MindConnect */}
        <div className="max-w-4xl mt-12 bg-white/70 backdrop-blur rounded-2xl border border-blue-100 p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-6 text-foreground">Why MindConnect?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-bold text-blue-600 mb-2">Safe & Private</h4>
              <p className="text-sm text-gray-600">
                Your privacy is our priority. All data is encrypted and protected.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <h4 className="font-bold text-purple-600 mb-2">Real Support</h4>
              <p className="text-sm text-gray-600">
                Connect with trained counselors who truly care about your wellbeing.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✨</div>
              <h4 className="font-bold text-pink-600 mb-2">No Judgment</h4>
              <p className="text-sm text-gray-600">
                Share your feelings freely in a supportive, judgment-free community.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
