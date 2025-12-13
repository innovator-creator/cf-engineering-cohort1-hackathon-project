"use client"

import { useState, useMemo, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Phone, Mail, MapPin, Loader2, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { fetchRepresentatives } from "@/lib/supabase/representatives"
import type { Representative } from "@/lib/supabase/types"

export function RepresentativesPage() {
  const { language, t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all")
  const [representatives, setRepresentatives] = useState<Representative[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadRepresentatives() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchRepresentatives()
        setRepresentatives(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load representatives"
        setError(errorMessage)
        console.error("Error loading representatives:", err)
      } finally {
        setLoading(false)
      }
    }
    loadRepresentatives()
  }, [])

  // Extract unique districts/regions from representatives
  const districts = useMemo(() => {
    const uniqueDistricts = [
      ...new Set(representatives.map((rep) => rep.region).filter((r): r is string => Boolean(r))),
    ]
    return uniqueDistricts.sort()
  }, [representatives])

  const filteredReps = useMemo(() => {
    return representatives.filter((rep) => {
      const name = rep.name?.toLowerCase() || ""
      const title = rep.title?.toLowerCase() || ""
      const searchLower = searchQuery.toLowerCase()

      const matchesSearch = name.includes(searchLower) || title.includes(searchLower)
      const matchesDistrict = selectedDistrict === "all" || rep.region === selectedDistrict

      return matchesSearch && matchesDistrict
    })
  }, [searchQuery, selectedDistrict, representatives])

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 pt-4">
          <h1 className="text-2xl font-bold mb-2">{t.representatives.title}</h1>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.representatives.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* District Filter */}
        {districts.length > 0 && (
          <div className="mb-6 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              <Button
                variant={selectedDistrict === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDistrict("all")}
              >
                {t.representatives.allDistricts}
              </Button>
              {districts.slice(0, 5).map((district) => (
                <Button
                  key={district}
                  variant={selectedDistrict === district ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDistrict(district)}
                  className="whitespace-nowrap"
                >
                  {district}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="p-6 border-destructive">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-destructive mb-1">Error Loading Representatives</h3>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Representatives List */}
        {!loading && !error && (
          <>
            {filteredReps.length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">
                  {representatives.length === 0
                    ? "No representatives available"
                    : "No representatives match your search"}
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredReps.map((rep) => (
                  <Card key={rep.id} className="p-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{rep.name || "Unnamed Representative"}</h3>
                      {rep.title && <p className="text-sm text-primary mb-1">{rep.title}</p>}
                      <p className="text-sm text-muted-foreground mb-3">
                        {rep.region && rep.region}
                        {rep.constituency && ` • ${rep.constituency}`}
                        {rep.party && ` • ${rep.party}`}
                      </p>

                      <div className="space-y-2 text-sm">
                        {rep.office_address && (
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground leading-relaxed">{rep.office_address}</span>
                          </div>
                        )}

                        {rep.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <a href={`tel:${rep.phone}`} className="text-primary hover:underline">
                              {rep.phone}
                            </a>
                          </div>
                        )}

                        {rep.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <a href={`mailto:${rep.email}`} className="text-primary hover:underline">
                              {rep.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
