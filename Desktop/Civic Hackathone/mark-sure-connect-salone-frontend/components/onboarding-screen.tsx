"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { ChevronRight, Globe } from "lucide-react"

interface OnboardingScreenProps {
  onComplete: () => void
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { language, setLanguage, t } = useLanguage()

  const slides = [
    {
      title: t.onboarding.slide1.title,
      description: t.onboarding.slide1.description,
      image: "/sierra-leone-coat-of-arms.jpg",
    },
    {
      title: t.onboarding.slide2.title,
      description: t.onboarding.slide2.description,
      image: "/government-documents-and-services.jpg",
    },
    {
      title: t.onboarding.slide3.title,
      description: t.onboarding.slide3.description,
      image: "/people-connecting-with-representatives.jpg",
    },
  ]

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Language Selector */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{t.onboarding.selectLanguage}</span>
            </div>
            <div className="flex gap-2">
              <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
                English
              </Button>
              <Button variant={language === "kr" ? "default" : "outline"} size="sm" onClick={() => setLanguage("kr")}>
                Krio
              </Button>
            </div>
          </div>
        </Card>

        {/* Slide Content */}
        <Card className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-48 h-48 mb-6 flex items-center justify-center">
              <img
                src={slides[currentSlide].image || "/placeholder.svg"}
                alt={slides[currentSlide].title}
                className={`${currentSlide === 0 ? "w-40 h-40 object-contain" : "w-48 h-48 rounded-lg object-cover"}`}
              />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-balance">{slides[currentSlide].title}</h2>
            <p className="text-muted-foreground mb-8 text-pretty leading-relaxed">{slides[currentSlide].description}</p>

            {/* Dots Indicator */}
            <div className="flex gap-2 mb-8">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 w-full">
              {currentSlide < slides.length - 1 && (
                <Button variant="outline" onClick={onComplete} className="flex-1 bg-transparent">
                  {t.onboarding.skip}
                </Button>
              )}
              <Button onClick={nextSlide} className="flex-1 gap-2">
                {currentSlide < slides.length - 1 ? t.onboarding.next : t.onboarding.getStarted}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
