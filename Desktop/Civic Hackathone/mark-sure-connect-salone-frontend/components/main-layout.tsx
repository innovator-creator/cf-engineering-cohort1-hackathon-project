"use client"

import { useState } from "react"
import { Home, FileText, Users, Phone, User } from "lucide-react"
import { HomePage } from "@/components/pages/home-page"
import { ServicesPage } from "@/components/pages/services-page"
import { RepresentativesPage } from "@/components/pages/representatives-page"
import { EmergencyPage } from "@/components/pages/emergency-page"
import { AccountPage } from "@/components/pages/account-page"
import { useLanguage } from "@/contexts/language-context"

type Page = "home" | "services" | "representatives" | "emergency" | "account"

export function MainLayout() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const { t } = useLanguage()

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />
      case "services":
        return <ServicesPage />
      case "representatives":
        return <RepresentativesPage />
      case "emergency":
        return <EmergencyPage />
      case "account":
        return <AccountPage />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {renderPage()}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentPage("home")}
            className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
              currentPage === "home" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">{t.nav.home}</span>
          </button>
          <button
            onClick={() => setCurrentPage("services")}
            className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
              currentPage === "services" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <FileText className="h-5 w-5" />
            <span className="text-xs font-medium">{t.nav.services}</span>
          </button>
          <button
            onClick={() => setCurrentPage("representatives")}
            className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
              currentPage === "representatives" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs font-medium">{t.nav.reps}</span>
          </button>
          <button
            onClick={() => setCurrentPage("emergency")}
            className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
              currentPage === "emergency" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Phone className="h-5 w-5" />
            <span className="text-xs font-medium">{t.nav.emergency}</span>
          </button>
          <button
            onClick={() => setCurrentPage("account")}
            className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
              currentPage === "account" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">{t.nav.account}</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
