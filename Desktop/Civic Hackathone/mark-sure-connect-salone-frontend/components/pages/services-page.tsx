"use client"

import { useState, useMemo, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronRight, Loader2, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { ServiceDetailModal } from "@/components/modals/service-detail-modal"
import { fetchGovServices } from "@/lib/supabase/services"
import type { GovService } from "@/lib/supabase/types"

// Adapter type for ServiceDetailModal compatibility
type ServiceForModal = {
  id: string
  name: string
  nameKr: string
  ministry: string
  ministryKr: string
  description: string
  descriptionKr: string
  requirements: string[]
  requirementsKr: string[]
  processingTime: string
  processingTimeKr: string
  fee: string
  feeKr: string
  location: string
  locationKr: string
  contactPhone?: string
  contactEmail?: string
}

export function ServicesPage() {
  const { language, t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedService, setSelectedService] = useState<ServiceForModal | null>(null)
  const [services, setServices] = useState<GovService[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchGovServices()
        setServices(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load services"
        setError(errorMessage)
        console.error("Error loading services:", err)
      } finally {
        setLoading(false)
      }
    }
    loadServices()
  }, [])

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(services.map((s) => s.ministry).filter(Boolean))]
    return ["all", ...uniqueCategories]
  }, [services])

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const serviceName = service.service_name?.toLowerCase() || ""
      const ministry = service.ministry?.toLowerCase() || ""
      const searchLower = searchQuery.toLowerCase()

      const matchesSearch = serviceName.includes(searchLower) || ministry.includes(searchLower)
      const matchesCategory = selectedCategory === "all" || service.ministry === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, services])

  // Convert GovService to ServiceForModal for the modal
  const convertToModalService = (service: GovService): ServiceForModal => {
    // Parse requirements from text (assuming comma-separated or newline-separated)
    const requirementsText = service.requirements || ""
    const requirementsList = requirementsText
      .split(/[,\n]/)
      .map((r) => r.trim())
      .filter(Boolean)

    return {
      id: service.id.toString(),
      name: service.service_name || "Unnamed Service",
      nameKr: service.service_name || "Unnamed Service", // Database doesn't have Krio, use same
      ministry: service.ministry || "Unknown Ministry",
      ministryKr: service.ministry || "Unknown Ministry", // Database doesn't have Krio, use same
      description: service.service_name || "No description available",
      descriptionKr: service.service_name || "No description available", // Database doesn't have description, use service name
      requirements: requirementsList.length > 0 ? requirementsList : ["No requirements specified"],
      requirementsKr: requirementsList.length > 0 ? requirementsList : ["No requirements specified"],
      processingTime: "Contact office for details", // Not in database
      processingTimeKr: "Contact office for details",
      fee: service.official_fee || "Contact office for details",
      feeKr: service.official_fee || "Contact office for details",
      location: "Contact office for location", // Not in database
      locationKr: "Contact office for location",
      contactPhone: service.contact_phone || undefined,
      contactEmail: service.contact_email || undefined,
    }
  }

  return (
    <>
      <div className="min-h-screen p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6 pt-4">
            <h1 className="text-2xl font-bold mb-2">{t.services.title}</h1>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.services.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="mb-6 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  {t.services.allCategories}
                </Button>
                {categories.slice(1, 6).map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category.split(" ").slice(0, 2).join(" ")}
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
                  <h3 className="font-semibold text-destructive mb-1">Error Loading Services</h3>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Services List */}
          {!loading && !error && (
            <>
              {filteredServices.length === 0 ? (
                <Card className="p-6 text-center">
                  <p className="text-muted-foreground">
                    {services.length === 0 ? "No services available" : "No services match your search"}
                  </p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {filteredServices.map((service) => (
                    <Card
                      key={service.id}
                      className="p-4 cursor-pointer transition-all hover:shadow-lg"
                      onClick={() => setSelectedService(convertToModalService(service))}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{service.service_name || "Unnamed Service"}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{service.ministry || "Unknown Ministry"}</p>
                          {service.requirements && (
                            <p className="text-sm text-foreground leading-relaxed line-clamp-2">
                              {service.requirements}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {selectedService && <ServiceDetailModal service={selectedService} onClose={() => setSelectedService(null)} />}
    </>
  )
}
