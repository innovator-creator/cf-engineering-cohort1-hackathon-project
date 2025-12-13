"use client"

import { Card } from "@/components/ui/card"
import { FileText, Users, Phone, DollarSign } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface HomePageProps {
  onNavigate: (page: "services" | "representatives" | "emergency") => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage()

  const quickAccessCards = [
    {
      icon: FileText,
      title: t.home.services,
      description: t.home.servicesDesc,
      onClick: () => onNavigate("services"),
      color: "text-primary",
    },
    {
      icon: Users,
      title: t.home.representatives,
      description: t.home.representativesDesc,
      onClick: () => onNavigate("representatives"),
      color: "text-secondary",
    },
    {
      icon: Phone,
      title: t.home.emergency,
      description: t.home.emergencyDesc,
      onClick: () => onNavigate("emergency"),
      color: "text-destructive",
    },
    {
      icon: DollarSign,
      title: t.home.fees,
      description: t.home.feesDesc,
      onClick: () => onNavigate("services"),
      color: "text-primary",
    },
  ]

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground text-xl font-bold">MS</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-balance">{t.home.title}</h1>
              <p className="text-sm text-muted-foreground">{t.home.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Quick Access Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">{t.home.quickAccess}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickAccessCards.map((card, index) => {
              const Icon = card.icon
              return (
                <Card
                  key={index}
                  className="p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  onClick={card.onClick}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${card.color} mt-1`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{card.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
