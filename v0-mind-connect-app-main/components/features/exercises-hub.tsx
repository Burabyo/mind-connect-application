"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const EXERCISES = [
  {
    id: 1,
    title: "Box Breathing",
    category: "Breathing",
    description: "A simple 4-count breathing technique to calm your mind",
    steps: ["Breathe in for 4 counts", "Hold for 4 counts", "Exhale for 4 counts", "Pause for 4 counts"],
  },
  {
    id: 2,
    title: "Positive Affirmations",
    category: "Affirmations",
    description: "Repeat these statements daily to boost confidence",
    steps: ["I am capable", "I am worthy", "I can handle challenges", "I am growing"],
  },
  {
    id: 3,
    title: "Gratitude Journal",
    category: "Journal",
    description: "Write down 3 things you are grateful for today",
    steps: ["Find a quiet place", "Write 3 things you appreciate", "Reflect on why you are grateful"],
  },
  {
    id: 4,
    title: "Stress Relief Game",
    category: "Game",
    description: "Play a quick game to reduce stress",
    steps: ["Click matching pairs", "Focus on the game", "Enjoy the calming effect"],
  },
]

export default function ExercisesHub() {
  const [selectedExercise, setSelectedExercise] = useState<any>(null)
  const [completed, setCompleted] = useState<number[]>([])

  const handleComplete = (id: number) => {
    if (!completed.includes(id)) {
      setCompleted([...completed, id])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Mental Health Exercises</h2>
        <p className="text-muted">Simple exercises to support your wellbeing</p>
      </div>

      {!selectedExercise ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXERCISES.map((exercise) => (
            <Card key={exercise.id} className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{exercise.title}</h3>
                  <p className="text-sm text-muted">{exercise.category}</p>
                </div>
                {completed.includes(exercise.id) && <span className="text-2xl">✓</span>}
              </div>
              <p className="text-muted text-sm mb-4">{exercise.description}</p>
              <Button onClick={() => setSelectedExercise(exercise)} size="sm">
                Start Exercise
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <div className="mb-6">
            <button onClick={() => setSelectedExercise(null)} className="text-primary font-medium mb-4">
              ← Back
            </button>
            <h3 className="text-2xl font-bold mb-2">{selectedExercise.title}</h3>
            <p className="text-muted">{selectedExercise.description}</p>
          </div>

          <div className="space-y-4 mb-6">
            {selectedExercise.steps.map((step: string, idx: number) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-surface border border-border rounded-lg">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="font-medium pt-1">{step}</p>
              </div>
            ))}
          </div>

          <Button
            onClick={() => handleComplete(selectedExercise.id)}
            disabled={completed.includes(selectedExercise.id)}
            className="w-full"
          >
            {completed.includes(selectedExercise.id) ? "✓ Completed" : "Mark as Completed"}
          </Button>
        </Card>
      )}
    </div>
  )
}
