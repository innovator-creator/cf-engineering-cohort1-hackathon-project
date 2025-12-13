"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Moon, Sun, Info } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"

export function AccountPage() {
  const { language, setLanguage, t } = useLanguage()
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 pt-4">
          <h1 className="text-2xl font-bold mb-2">{t.account.title}</h1>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          {/* Language Setting */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{t.account.language}</p>
                  <p className="text-sm text-muted-foreground">{language === "en" ? "English" : "Krio"}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
                  EN
                </Button>
                <Button variant={language === "kr" ? "default" : "outline"} size="sm" onClick={() => setLanguage("kr")}>
                  KR
                </Button>
              </div>
            </div>
          </Card>

          {/* Dark Mode Setting */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDark ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
                <div>
                  <p className="font-medium">{t.account.darkMode}</p>
                  <p className="text-sm text-muted-foreground">{isDark ? "On" : "Off"}</p>
                </div>
              </div>
              <Button variant={isDark ? "default" : "outline"} size="sm" onClick={toggleTheme}>
                {isDark ? "On" : "Off"}
              </Button>
            </div>
          </Card>

          {/* About */}
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium mb-1">{t.account.about}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Your gateway to government services, representatives, and emergency support in Sierra Leone.
                </p>
                <p className="text-xs text-muted-foreground">{t.account.version}</p>
                <p className="text-xs text-muted-foreground mt-1">By JOHN MARK FORNAH</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
