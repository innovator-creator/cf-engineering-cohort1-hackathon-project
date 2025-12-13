"use client"

import { useEffect, useState } from "react"
import { OnboardingScreen } from "@/components/onboarding-screen"
import { MainLayout } from "@/components/main-layout"

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true")
    setShowOnboarding(false)
  }

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />
  }

  return <MainLayout />
}
