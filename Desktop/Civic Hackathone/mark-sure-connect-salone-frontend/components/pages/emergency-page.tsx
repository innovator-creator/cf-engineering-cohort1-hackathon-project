"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Flame, AlertTriangle, Siren } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { emergencyContacts } from "@/lib/data/emergency"

export function EmergencyPage() {
  const { language, t } = useLanguage()

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "police":
        return Siren
      case "fire":
        return Flame
      case "ambulance":
        return AlertTriangle
      case "emergency":
        return Phone
      default:
        return Phone
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-6 bg-destructive/5">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 pt-4">
          <h1 className="text-2xl font-bold mb-2 text-destructive">{t.emergency.title}</h1>
          <p className="text-muted-foreground">{t.emergency.subtitle}</p>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-4">
          {emergencyContacts.map((contact) => {
            const Icon = getIcon(contact.icon)
            return (
              <Card key={contact.id} className="p-6 border-destructive/20">
                <div className="flex items-start gap-4">
                  <div className="bg-destructive/10 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{language === "en" ? contact.name : contact.nameKr}</h3>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {language === "en" ? contact.description : contact.descriptionKr}
                    </p>
                    <Button asChild className="w-full sm:w-auto bg-destructive hover:bg-destructive/90">
                      <a href={`tel:${contact.number}`} className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {contact.number}
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Warning Notice */}
        <Card className="mt-6 p-4 bg-muted">
          <p className="text-sm text-center text-muted-foreground leading-relaxed">
            For life-threatening emergencies, always call immediately. Stay calm and provide your location clearly.
          </p>
        </Card>
      </div>
    </div>
  )
}
